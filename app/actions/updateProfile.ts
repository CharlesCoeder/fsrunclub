"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function updateProfile(userId: string, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const imageFile = formData.get("image") as File | null;

  let imageUrl = undefined;

  if (imageFile) {
    const fileBuffer = await imageFile.arrayBuffer();
    const fileName = `${userId}-${Date.now()}-${imageFile.name}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: Buffer.from(fileBuffer),
        ContentType: imageFile.type,
      })
    );

    imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    revalidatePath(`/profile/${userId}`);
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error("Failed to update profile");
  }
}