import React from "react";
import RunSchedule from "@/components/runs/RunSchedule";
import InstructorList from "@/components/instructors/InstructorList";
import RewardProgress from "@/components/rewards/RewardProgress";
import Header from "@/components/Header";

export default async function HomePage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      <h1 className="text-4xl font-bold mb-8">Welcome to Run Club</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Runs</h2>
        <RunSchedule />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Instructors</h2>
        <InstructorList />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rewards Program</h2>
        <RewardProgress />
      </section>
    </div>
  );
}
