import { useState, useEffect } from 'react';
import { Run } from '@prisma/client';
import { getUpcomingRuns } from '@/actions/runs';

export function useUpcomingRuns(month: number, year: number) {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRuns() {
      try {
        setLoading(true);
        const fetchedRuns = await getUpcomingRuns(month, year);
        setRuns(fetchedRuns);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchRuns();
  }, [month, year]);

  return { runs, loading, error };
}