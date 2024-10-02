"use client";

import { useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import { addRun } from "@/actions/addRun";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  date: z.date({
    required_error: "A date is required",
  }),
  time: z.string().min(1, { message: "Time is required" }),
  pace: z.string().min(1, { message: "Pace is required" }),
  distance: z.number().positive({ message: "Distance must be positive" }),
  route: z.string().optional(),
  meetupLocation: z.string().optional(),
});

export default function AddRunForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      pace: "",
      distance: 0,
      route: "",
      meetupLocation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Convert the Date object to an ISO string
      const runData = {
        ...values,
        date: values.date.toISOString().split('T')[0], // This will give us YYYY-MM-DD
      };
      await addRun(runData);
      form.reset();
      // You can add a success message or redirect here
    } catch (error) {
      console.error("Failed to add run:", error);
      // You can add an error message here
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Add New Run</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    className="rounded-md border"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pace</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 8:30 min/mile" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (miles)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="route"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route (optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe the route" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meetupLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meetup Location (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Central Park Entrance" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Run"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}