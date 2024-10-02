import { prisma } from '@/lib/prisma';

async function main() {
  // Create users
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@example.com' },
    update: {},
    create: {
      email: 'instructor@example.com',
      name: 'John Doe',
      password: 'hashed_password_here', // Remember to hash passwords in production
      role: 'INSTRUCTOR',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Jane Smith',
      password: 'hashed_password_here', // Remember to hash passwords in production
      role: 'USER',
    },
  })

  // Create a run
  const run = await prisma.run.create({
    data: {
      date: new Date('2023-06-01T09:00:00Z'),
      time: '09:00 AM',
      pace: '8:00 min/mile',
      distance: 5,
      route: 'City Park Loop',
      meetupLocation: 'City Park Entrance',
      qrCode: 'unique_qr_code_1',
    },
  })

  // Associate the instructor with the run
  await prisma.instructorRun.create({
    data: {
      instructorId: instructor.id,
      runId: run.id,
    },
  })

  // Associate the user with the run
  await prisma.userRun.create({
    data: {
      userId: user.id,
      runId: run.id,
    },
  })

  // Create a reward
  const reward = await prisma.reward.create({
    data: {
      name: '10 Run T-Shirt',
      description: 'A special t-shirt for completing 10 runs',
      requirement: 10,
    },
  })

  // Associate the reward with the user
  await prisma.userReward.create({
    data: {
      userId: user.id,
      rewardId: reward.id,
    },
  })

  console.log({ instructor, user, run, reward })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })