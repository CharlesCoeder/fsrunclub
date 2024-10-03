"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile } from "@/actions/updateProfile";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  bio: z.string().optional(),
});

type ProfileEditProps = {
  profile: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    bio?: string;
    participatedRuns: Array<{
      id: string;
      date: Date;
      distance: number;
      pace: string;
    }>;
  };
};

export default function ProfileEdit({ profile }: ProfileEditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      bio: profile.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("bio", values.bio || "");
      if (imageFile) {
        formData.append("image", imageFile);
      }
      await updateProfile(profile.id, formData);
      // You can add a success message or redirect here
    } catch (error) {
      console.error("Failed to update profile:", error);
      // You can add an error message here
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={profile.image || "/default-avatar.png"}
                alt={profile.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {profile.role === "INSTRUCTOR" && (
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Participated Runs</h3>
          {profile.participatedRuns.length > 0 ? (
            <ul className="space-y-2">
              {profile.participatedRuns.map((run) => (
                <li key={run.id} className="border p-2 rounded">
                  <p>Date: {run.date.toLocaleDateString()}</p>
                  <p>Distance: {run.distance} miles</p>
                  <p>Pace: {run.pace}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No runs participated yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}