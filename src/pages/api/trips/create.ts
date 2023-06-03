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
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  const trip = req.body;
  try {
    const createdTrip = await prisma.trip.create({
      data: {
        title: trip.title,
        description: trip.description,
        startDate: trip.startDate,
        endDate: trip.endDate,
        location: trip.location,
        photos: {
          create: trip.files.map((file: string) => ({
            url: file,
          })),
        },
        hashtags: {
          create: trip.hashtags.map((hashtag: string) => ({
            name: hashtag,
          })),
        },
        user: {
          connect: { id: trip.userId },
        },
      },
    });
    res.status(200).json(createdTrip);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the trip." });
  }
}
