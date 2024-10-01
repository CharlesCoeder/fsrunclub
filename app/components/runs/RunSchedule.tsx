import React from "react";
// import { useRuns } from "@/hooks/useRuns";
// import RunCard from "./RunCard";

export default function RunSchedule() {
  // const { runs, isLoading, error } = useRuns();

  // if (isLoading) return <div>Loading runs...</div>;
  // if (error) return <div>Error loading runs: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* {runs.map((run) => (
        <RunCard key={run.id} run={run} />
      ))} */}
    </div>
  );
}
