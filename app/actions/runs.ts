"use server"

import { prisma } from '@/lib/prisma';
import { Run } from '@prisma/client';

export async function getUpcomingRuns(month: number, year: number): Promise<Run[]> {
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  return prisma.run.findMany({
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    include: {
      instructors: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
}