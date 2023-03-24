// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, UnavailabilityType } from "@prisma/client";
import { isAuthorized } from "@webapp/helpers/isAuthorized";

const prisma = new PrismaClient();

type Data = {
  error?: string;
  message?: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const unavailabilities = await prisma.unavailabilities.findMany();

    prisma.$disconnect();

    return res.status(200).json({
      data: unavailabilities,
    });
  }

  if (req.method === "POST") {
    if (!isAuthorized(req.headers.authorization)) return res.status(401).json({ error: "Unauthorized", message: "Make sure you are connected" });

    const { type, value } = req.body;

    if (type !== UnavailabilityType.WEEK_END) {
      const result = await prisma.unavailabilities.create({
        data: {
          type,
          value,
        },
      });

      prisma.$disconnect();

      return res.status(200).json({
        data: result,
      });
    } else {
      let result = {};

      const weekEnds = await prisma.unavailabilities.findFirst({
        where: {
          type: UnavailabilityType.WEEK_END,
        },
      });

      if (weekEnds) result = await prisma.unavailabilities.deleteMany({ where: { type: UnavailabilityType.WEEK_END } });
      if (!weekEnds)
        result = await prisma.unavailabilities.create({
          data: {
            type,
            value,
          },
        });

      prisma.$disconnect();

      return res.status(200).json({
        data: result,
      });
    }
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

    prisma.$disconnect();

    return res.status(200).json({
      data: result,
    });
  }
}
