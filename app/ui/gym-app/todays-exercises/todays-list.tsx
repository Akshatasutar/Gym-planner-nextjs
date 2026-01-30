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

  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    draggedItem.current = (e.currentTarget as HTMLDivElement).id;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.classList.add(
      "opacity-70",
      "scale-105",
      "cursor-grabbing",
      "shadow-xl",
      "z-50",
    );
  };

  const onDragEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el?.id) draggedOverItem.current = el?.id;
  };

  const onDrop = (e: any) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    e.currentTarget.classList.remove(
      "opacity-70",
      "scale-105",
      "scale-85",
      "cursor-grabbing",
      "shadow-xl",
      "z-50",
      "z-10",
    );

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
      {todaysList.map((exercise, idx) => (
        <Suspense key={exercise.id} fallback={<CardSkeleton />}>
          <div className="flex flex-row gap-1 w-full">
            <div className="bg-purple-100 border border-purple-300 h-6 px-2 rounded-full my-4 mr-1 text-l text-purple-800">
              {(idx + 1).toString()}
            </div>
            <TodaysExerciseCard
              key={exercise.id}
              exercise={exercise}
              dragStartFn={onDragStart}
              dragEnterFn={onDragEnter}
              dragEndFn={onDrop}
              data-drop-id={exercise.id}
            />
          </div>
        </Suspense>
      ))}
    </div>
  );
}
