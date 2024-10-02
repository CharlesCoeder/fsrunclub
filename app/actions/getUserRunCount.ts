'use server'

import { prisma } from "@/lib/prisma";

export async function getUserRunCount(userId: string): Promise<number> {
  const count = await prisma.userRun.count({
    where: { userId: userId }
  });
  return count;
}