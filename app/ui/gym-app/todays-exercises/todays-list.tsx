"use client";
import { Suspense, useMemo, useRef, useState } from "react";
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
  const draggedItem = useRef("");
  const draggedOverItem = useRef("");

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    draggedItem.current = (e.target as HTMLDivElement).id;
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    draggedOverItem.current = (e.currentTarget as HTMLDivElement).id;
  };

  const onDrop = (e: any) => {
    const currentList = [...todaysList];
    const draggedItemIndex = todaysList.findIndex(
      (item) => item.id == draggedItem.current,
    );
    const draggedExercise = todaysList[draggedItemIndex];

    const draggedOverItemIndex = todaysList.findIndex(
      (item) => item.id == draggedOverItem.current,
    );
    const draggedOverExercise = todaysList[draggedOverItemIndex];

    currentList[draggedOverItemIndex] = draggedExercise;
    currentList[draggedItemIndex] = draggedOverExercise;

    setTodaysList(currentList);
  };

  return (
    <div>
      {todaysList.map((exercise) => (
        <Suspense key={exercise.id} fallback={<CardSkeleton />}>
          <TodaysExerciseCard
            key={exercise.id}
            exercise={exercise}
            dragStartFn={onDragStart}
            dragEnterFn={onDragEnter}
            dragEndFn={onDrop}
          />
        </Suspense>
      ))}
    </div>
  );
}
