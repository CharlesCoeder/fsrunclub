"use client";

import React from "react";
import { useInstructors } from "@/hooks/useInstructors";
import InstructorCard from "./InstructorCard";
import { Instructor } from "@/types/instructor";

export default function InstructorList() {
  let { instructors, isLoading, error } = useInstructors();

  if (isLoading) return <div>Loading instructors...</div>;
  if (error) {
    // use mock data since API is not yet implemented
    instructors = [
      {
        id: "Charlie",
        name: "Charlie",
        email: "croeder@nyit.edu",
        bio: "Long bio! He's amaazing awaesomef oiajdsflkasdjf",
        profileImage: "",
        specialties: ["Long runs, etc"],
      },
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {instructors.map((instructor) => (
        <InstructorCard key={instructor.id} instructor={instructor} />
      ))}
    </div>
  );
}
