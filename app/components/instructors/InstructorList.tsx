"use client";

import React from "react";
import { useInstructors } from "@/hooks/useInstructors";
import InstructorCard from "./InstructorCard";
import { getInstructors } from "@/actions/getInstructors";

export default function InstructorList() {
  const { instructors, isLoading, error } = useInstructors(getInstructors);

  if (isLoading) return <div>Loading instructors...</div>;
  if (error) return <div>Error loading instructors: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {instructors.map((instructor) => (
        <InstructorCard key={instructor.id} instructor={instructor} />
      ))}
    </div>
  );
}
