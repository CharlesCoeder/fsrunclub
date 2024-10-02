import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

async function main() {
  // Create users (instructor and regular user)
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@example.com' },
    update: {},
    create: {
      email: 'instructor@example.com',
      name: 'John Doe',
      password: 'hashed_password_here', // Remember to hash passwords in production
      role: Role.INSTRUCTOR,
      bio: 'Experienced running coach with 10 years of training athletes.',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Jane Smith',
      password: 'hashed_password_here', // Remember to hash passwords in production
      role: Role.USER,
    },
  });

  // Create runs
  const run1 = await prisma.run.create({
    data: {
      date: new Date('2023-06-01T09:00:00Z'),
      time: '09:00 AM',
      pace: '8:00 min/mile',
      distance: 5,
      route: 'City Park Loop',
      meetupLocation: 'City Park Entrance',
      qrCode: 'unique_qr_code_1',
    },
  });

  const run2 = await prisma.run.create({
    data: {
      date: new Date('2023-06-08T18:30:00Z'),
      time: '6:30 PM',
      pace: '9:30 min/mile',
      distance: 3,
      route: 'Riverside Trail',
      meetupLocation: 'River Bridge',
      qrCode: 'unique_qr_code_2',
    },
  });

  // Associate the instructor with the runs
  await prisma.runInstructor.createMany({
    data: [
      { userId: instructor.id, runId: run1.id },
      { userId: instructor.id, runId: run2.id },
    ],
  });

  // Associate the user with the runs
  await prisma.userRun.createMany({
    data: [
      { userId: user.id, runId: run1.id },
      { userId: user.id, runId: run2.id },
    ],
  });

  // Create rewards
  const reward1 = await prisma.reward.create({
    data: {
      name: '10 Run T-Shirt',
      description: 'A special t-shirt for completing 10 runs',
      requirement: 10,
    },
  });

  const reward2 = await prisma.reward.create({
    data: {
      name: '25 Run Water Bottle',
      description: 'A high-quality water bottle for completing 25 runs',
      requirement: 25,
    },
  });

  // Associate the rewards with the user
  await prisma.userReward.create({
    data: {
      userId: user.id,
      rewardId: reward1.id,
    },
  });

  console.log({ instructor, user, run1, run2, reward1, reward2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });