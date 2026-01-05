"use client";
import { TodaysExercise } from "@/app/lib/definitions";
import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDateToLocal, NULL_PLACEHOLDER } from "@/app/lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function TodaysExerciseCard({
  exercise,
}: {
  exercise: TodaysExercise;
}) {
  const [statusArray, setStatusArray] = useState<Array<boolean>>(
    new Array<boolean>(exercise.sets).fill(false)
  );
  const [isAllSetsCompleted, setIsAllSetsCompleted] = useState<boolean>(
    false
    // exercise.is_completed
  );

  useEffect(() => {
    if (statusArray.every((isSetDone) => isSetDone))
      setIsAllSetsCompleted(true);
  }, [statusArray]);

  return (
    <div
      className={clsx(
        "rounded-md bg-gray-50 p-2 mt-2 flex flex-row justify-between",
        { "bg-green-100": isAllSetsCompleted }
      )}
    >
      <div className="mr-2 w-full">
        <p>
          <strong>{exercise.name}</strong>
        </p>
        <div className="flex flex-row ml-0 p-1">
          {statusArray.map((isDone, i) => (
            <button
              onClick={() =>
                setStatusArray(
                  statusArray.map((oldItem, idx) => (idx == i ? true : oldItem))
                )
              }
            >
              <CheckCircleIcon
                className={clsx(
                  "h-8 w-8 text-gray-400 justify-end mr-1 active:outline-purple-600 ml-3 p-0 rounded-full",
                  { "bg-purple-700 text-gray-50": isDone }
                )}
                key={i}
              />
            </button>
          ))}
        </div>
        <div className=" text-sm text-grey-400 p-2">
          <p>
            PR{" : "}
            <b className="text-base">{exercise.current_pr}kg</b>
            <button className="active:bg-gray-200">
              <PencilIcon className="h-4 w-4 text-gray-400 justify-end mr-1 active:outline-purple-600 ml-3 p-0" />
            </button>
          </p>
          <p>{`on ${
            exercise.date_of_pr
              ? formatDateToLocal(exercise.date_of_pr) + "!"
              : NULL_PLACEHOLDER
          }`}</p>
        </div>
      </div>
      <button
        className="flex items-center rounded-lg bg-red-700 p-3 text-sm h-6 w-10 active:bg-red-300 disabled:bg-gray-400"
        onClick={() => {}}
        disabled={isAllSetsCompleted}
      >
        <TrashIcon className="h-5 w-5 text-gray-50 active:outline-purple-600" />
      </button>
    </div>
  );
}
