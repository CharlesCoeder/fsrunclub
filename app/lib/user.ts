import prisma from "@/lib/prisma";

export async function getUserProfile(userId: string) {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      bio: true,
      createdAt: true,
      participatedRuns: {
        select: {
          run: {
            select: {
              id: true,
              date: true,
              distance: true,
              pace: true,
            }
          }
        }
      }
    }
  });

  if (!profile) return null;

  return {
    id: profile.id,
    name: profile.name || "Anonymous",
    email: profile.email || "",
    image: profile.image || "/default-avatar.png",
    role: profile.role,
    bio: profile.bio || "",
    createdAt: profile.createdAt || new Date(), // Fallback to current date if null
    participatedRuns: profile.participatedRuns.map(pr => ({
      id: pr.run.id,
      date: pr.run.date,
      distance: pr.run.distance,
      pace: pr.run.pace,
    })),
  };
}