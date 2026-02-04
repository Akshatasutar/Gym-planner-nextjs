"use client";
import { Suspense, useState } from "react";
import TodaysExerciseCard from "./todays-exc-card";
import { TodaysExercise } from "@/app/lib/definitions";
import { CardSkeleton } from "../../skeletons";

export default function TodaysExercisesCardList({
  todaysExercises,
}: {
  todaysExercises: TodaysExercise[];
}) {
  const [todaysList, setTodaysList] =
    useState<TodaysExercise[]>(todaysExercises);

  const moveUp = (excId: string) => {
    const currentList = [...todaysList];
    const currentExcIndex = todaysList.findIndex((item) => item.id == excId);
    const currentExc = todaysList[currentExcIndex];
    const excAbove = todaysList[currentExcIndex - 1];
    currentList[currentExcIndex] = excAbove;
    currentList[currentExcIndex - 1] = currentExc;

    setTodaysList(currentList);
  };

  const moveDown = (excId: string) => {
    const currentList = [...todaysList];
    const currentExcIndex = todaysList.findIndex((item) => item.id == excId);
    const currentExc = todaysList[currentExcIndex];
    const excBelow = todaysList[currentExcIndex + 1];
    currentList[currentExcIndex] = excBelow;
    currentList[currentExcIndex + 1] = currentExc;

    setTodaysList(currentList);
  };

  return (
    <div>
      {todaysList.map((exercise, idx) => (
        <Suspense key={exercise.id} fallback={<CardSkeleton />}>
          <div className="flex flex-row gap-1 w-full">
            <div className="bg-purple-100 border border-purple-300 h-6 px-2 rounded-full my-4 mr-1 text-l text-purple-800">
              {(idx + 1).toString()}
            </div>
            <TodaysExerciseCard
              key={exercise.id}
              exercise={exercise}
              moveExerciseUp={moveUp}
              moveExerciseDown={moveDown}
              isFirstExercise={idx == 0}
              isLastExercise={idx == todaysList.length - 1}
            />
          </div>
        </Suspense>
      ))}
    </div>
  );
}
