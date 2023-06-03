/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// pages/api/trips.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const trips = await prisma.trip.findMany({
      include: {
        photos: true,
        hashtags: true,
        user: true,
      },
    });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching trips." });
  }
}
