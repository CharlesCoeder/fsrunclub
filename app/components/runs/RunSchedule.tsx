"use client"

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useUpcomingRuns } from '@/hooks/useUpcomingRuns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RunSchedule() {
  const [date, setDate] = useState<Date>(new Date());
  const { runs, loading, error } = useUpcomingRuns(date.getMonth(), date.getFullYear());

  const runDates = runs.map(run => new Date(run.date).toDateString());

  const handleMonthChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Run Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          onMonthChange={handleMonthChange}
          className="rounded-md border"
          modifiers={{
            hasRun: (day) => runDates.includes(day.toDateString()),
          }}
          modifiersStyles={{
            hasRun: { backgroundColor: '#22c55e', color: 'white' },
          }}
        />
        {loading && <p>Loading runs...</p>}
        {error && <p>Error loading runs: {error.message}</p>}
        {!loading && !error && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Upcoming Runs</h3>
            {runs.length === 0 ? (
              <p>No runs scheduled for this month.</p>
            ) : (
              <ul className="space-y-2">
                {runs.map((run) => (
                  <li key={run.id} className="flex items-center justify-between">
                    <span>{new Date(run.date).toLocaleDateString()} - {run.time}</span>
                    <Badge>{run.distance}km</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}