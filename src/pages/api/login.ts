// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { checkHash } from "@webapphelpers/encryption/encrypt";
import { signToken } from "@webapphelpers/encryption/jwt";

const prisma = new PrismaClient();

type Data = {
  error?: string;
  message?: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user: any = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!user) return res.status(401).json({ error: "Unauthorized", message: "User does not exist" });

    const isPasswordCorrect = await checkHash(password, user.password);

    if (!isPasswordCorrect) return res.status(401).json({ error: "Unauthorized", message: "Incorrect Password" });

    delete user.password;

    const token = signToken(user);

    prisma.$disconnect();

    return res.status(200).json({
      data: {
        user,
        token,
      },
    });
  }
}
