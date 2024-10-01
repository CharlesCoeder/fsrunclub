"use client";

import { useState, useEffect } from "react";
import { Instructor } from "@/types/instructor";

export function useInstructors() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchInstructors() {
      try {
        const response = await fetch("/api/instructors");
        if (!response.ok) {
          throw new Error("Failed to fetch instructors");
        }
        const data = await response.json();
        setInstructors(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchInstructors();
  }, []);

  return { instructors, isLoading, error };
}
