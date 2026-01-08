import { fetchTodaysExercises } from "@/app/lib/data-queries";
import { ActionButtonRow } from "@/app/ui/action-button-row";
import TodaysExerciseCard from "@/app/ui/gym-app/todays-exercises/todays-exc-card";
import { CardSkeleton } from "@/app/ui/skeletons";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const todaysExercises = await fetchTodaysExercises();

  return (
    <main>
      <h1 className={`antialiased text-xl text-purple-900 md:text-3xl`}>
        Today's Exercises
      </h1>
      <p> Here is today's workout plan</p>
      <div className="flex flex-row gap-2">
        <ActionButtonRow />
      </div>
      <div>
        {todaysExercises.map((exercise) => (
          <Suspense key={exercise.id} fallback={<CardSkeleton />}>
            <TodaysExerciseCard key={exercise.id} exercise={exercise} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}
