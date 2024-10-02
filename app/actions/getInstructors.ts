'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getInstructors() {
  try {
    const instructors = await prisma.user.findMany({
      where: {
        role: 'INSTRUCTOR'
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
      }
    })
    return instructors.map(instructor => ({
      ...instructor,
      profileImage: instructor.image || '',
      specialties: [],
    }))
  } catch (error) {
    console.error('Error fetching instructors:', error)
    throw new Error('Failed to fetch instructors')
  } finally {
    await prisma.$disconnect()
  }
}