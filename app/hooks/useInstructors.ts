import { useState, useEffect } from 'react';
import { Instructor } from '@/types/instructor';

export function useInstructors(fetchInstructors: () => Promise<Instructor[]>) {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadInstructors() {
      try {
        setIsLoading(true);
        const data = await fetchInstructors();
        setInstructors(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    }

    loadInstructors();
  }, [fetchInstructors]);

  return { instructors, isLoading, error };
}