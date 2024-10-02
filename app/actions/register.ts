'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function register(data: RegisterData) {
  try {
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Error creating user' };
  }
}