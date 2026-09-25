// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { isAuthorized } from "@webapp/helpers/isAuthorized";
import prisma from "@webapp/lib/prisma";
import {
  isUnavailabilityType,
  parseUnavailabilityValue,
  serializeUnavailabilityValue,
  UnavailabilityType,
} from "@webapp/types/unavailability";
import type { Unavailability } from "@webapp/types/unavailability";

type Data = {
  error?: string;
  message?: string;
  data?: Unavailability | Unavailability[] | { removed: number };
};

/**
 * SQLite keeps no Json column type, so `value` is persisted as JSON text and
 * parsed back into the object shape the pages expect before it leaves the API.
 *
 * `type` and `value` are deliberately typed as `unknown`: the generated Prisma
 * client has described them as `string` (current SQLite schema) and as
 * `JsonValue` (the previous PostgreSQL schema), and the runtime narrowing below
 * accepts either. Keeping this structural means a stale generated client can no
 * longer break `next build`.
 */
const normalize = (row: { id: number; type: unknown; value: unknown }): Unavailability => ({
  id: row.id,
  type: isUnavailabilityType(row.type) ? row.type : UnavailabilityType.DAY,
  value: parseUnavailabilityValue(row.value),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const unavailabilities = await prisma.unavailabilities.findMany();

    return res.status(200).json({
      data: unavailabilities.map(normalize),
    });
  }

  if (req.method === "POST") {
    if (!isAuthorized(req.headers.authorization)) return res.status(401).json({ error: "Unauthorized", message: "Make sure you are connected" });

    const { type, value } = req.body;

    if (!isUnavailabilityType(type)) return res.status(400).json({ error: "Bad Request", message: "Unknown unavailability type" });

    // Weekend blocking is a switch, not a range: the row either exists or it does not.
    if (type !== UnavailabilityType.WEEK_END) {
      const result = await prisma.unavailabilities.create({
        data: {
          type,
          value: serializeUnavailabilityValue(value),
        },
      });

      return res.status(200).json({
        data: normalize(result),
      });
    }

    const weekEnds = await prisma.unavailabilities.findFirst({
      where: {
        type: UnavailabilityType.WEEK_END,
      },
    });

    // Toggling the switch off clears the single sentinel row; toggling it on creates it.
    if (weekEnds) {
      const removed = await prisma.unavailabilities.deleteMany({ where: { type: UnavailabilityType.WEEK_END } });

      return res.status(200).json({
        data: { removed: removed.count },
      });
    }

    const result = await prisma.unavailabilities.create({
      data: {
        type,
        value: serializeUnavailabilityValue(value),
      },
    });

    return res.status(200).json({
      data: normalize(result),
    });
  }

  if (req.method === "DELETE") {
    if (!isAuthorized(req.headers.authorization)) return res.status(401).json({ error: "Unauthorized", message: "Make sure you are connected" });

    const { id } = req.query as { id: string };

    if (!id) return res.status(400).json({ error: "Bad Request", message: "Make sure you provide a valid ID" });

    const result = await prisma.unavailabilities.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      data: normalize(result),
    });
  }

  return res.status(405).json({ error: "Method Not Allowed", message: "Unsupported method" });
}
