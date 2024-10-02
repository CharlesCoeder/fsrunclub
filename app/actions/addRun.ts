"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addRun(data: {
  date: string;
  time: string;
  pace: string;
  distance: number;
  route?: string;
  meetupLocation?: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "INSTRUCTOR") {
    throw new Error("Unauthorized");
  }

  try {
    const newRun = await prisma.run.create({
      data: {
        date: new Date(data.date),
        time: data.time,
        pace: data.pace,
        distance: data.distance,
        route: data.route,
        meetupLocation: data.meetupLocation,
        qrCode: "placeholder", // We'll implement QR code generation later
      },
    });

    // Create the RunInstructor association
    await prisma.runInstructor.create({
      data: {
        userId: session.user.id,
        runId: newRun.id,
      },
    });

    revalidatePath("/dashboard/add-run");
    return newRun;
  } catch (error) {
    console.error("Failed to add run:", error);
    throw new Error("Failed to add run");
  }
}