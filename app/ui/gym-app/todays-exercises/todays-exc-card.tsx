"use client";
import { TodaysExercise } from "@/app/lib/definitions";
import {
  CheckCircleIcon,
  ChevronUpDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDateToLocal, NULL_PLACEHOLDER } from "@/app/lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "@/app/ui/home.module.css";
import {
  deleteTodaysExerciseWithId,
  updateLastPerformedDate,
} from "@/app/lib/actions";
import EditPrInput from "../../edit-pr-input";
import { Button } from "../../button";

export default function TodaysExerciseCard({
  exercise,
  dragStartFn,
  dragEnterFn,
  dragEndFn,
}: {
  exercise: TodaysExercise;
  dragStartFn: (e: React.DragEvent<HTMLDivElement>) => void;
  dragEnterFn: (e: React.DragEvent<HTMLDivElement>) => void;
  dragEndFn: (e: React.DragEvent<HTMLDivElement>) => void;
  // dragStartFn: (e: React.TouchEvent<HTMLDivElement>) => void;
  // dragEnterFn: (e: React.TouchEvent<HTMLDivElement>) => void;
  // dragEndFn: (e: React.TouchEvent<HTMLDivElement>) => void;
}) {
  const [statusArray, setStatusArray] = useState<Array<boolean>>(
    new Array<boolean>(exercise.total_sets).fill(false),
  );
  const [isAllSetsCompleted, setIsAllSetsCompleted] = useState<boolean>(
    false,
    // exercise.is_completed
  );
  const [showEditPrInput, setShowEditPrInput] = useState(false);

  const handleDeleteIndividual = deleteTodaysExerciseWithId.bind(
    null,
    exercise.id,
    exercise.main_exercise_id,
  );

  useEffect(() => {
    if (statusArray.every((isSetDone) => isSetDone)) {
      setIsAllSetsCompleted(true);
      updateLastPerformedDate(exercise.main_exercise_id);
    }
  }, [statusArray]);

  return (
    <div
      id={exercise.id}
      draggable
      // onTouchStart={(e) => dragStartFn(e)}
      // onTouchE
      // onTouchEnd={(e) => dragEndFn(e)}
      onDragStart={(e) => dragStartFn(e)}
      onDragEnter={(e) => dragEnterFn(e)}
      onDragEnd={(e) => dragEndFn(e)}
      className={clsx(styles.card, "bg-gray-50 w-full mr-1", {
        "bg-green-100": isAllSetsCompleted,
      })}
    >
      <div className="mr-2 w-full">
        <p>
          <strong>{exercise.exercise_name}</strong>
        </p>
        <div className="flex flex-row ml-0 p-1">
          {statusArray.map((isDone, i) => (
            <button
              key={i}
              onClick={() =>
                setStatusArray(
                  statusArray.map((oldItem, idx) =>
                    idx == i ? true : oldItem,
                  ),
                )
              }
            >
              <CheckCircleIcon
                className={clsx(
                  "h-8 w-8 text-gray-400 justify-end mr-1 active:outline-purple-600 ml-3 p-0 rounded-full",
                  { "bg-green-700 text-gray-50": isDone },
                )}
                key={i}
              />
            </button>
          ))}
        </div>
        <div className=" text-sm text-grey-400 p-2">
          <div>
            PR{" : "}
            {showEditPrInput ? (
              <EditPrInput
                oldPr={exercise.pr ?? 0}
                setShowInput={setShowEditPrInput}
                mainExerciseId={exercise.main_exercise_id}
              />
            ) : (
              <>
                <b className="text-base">
                  {exercise.pr} {exercise.is_reps ? "reps" : "kg"}
                </b>

                <button
                  className="active:bg-gray-200"
                  onClick={() => setShowEditPrInput(true)}
                >
                  <PencilIcon className="h-4 w-4 text-gray-400 justify-end mr-1 active:outline-purple-600 ml-3 p-0" />
                </button>
              </>
            )}
          </div>
          <p>{`on ${
            exercise.date_of_pr
              ? formatDateToLocal(exercise.date_of_pr) + "!"
              : NULL_PLACEHOLDER
          }`}</p>
        </div>
      </div>
      <form action={handleDeleteIndividual}>
        <button
          type="submit"
          className="flex items-center rounded-lg h-6 w-10 bg-red-700 px-2 justify-center enabled:hover:bg-red-400 active:bg-red-300 disabled:bg-gray-400"
          disabled={isAllSetsCompleted}
        >
          <TrashIcon className="text-gray-50 h-6 w-5" />
        </button>
      </form>

      {/* <button className="flex items-center justify-center h-4/5 w-full hover:cursor-grab active:cursor-grabbing">
          <ChevronUpDownIcon className="h-6" />
        </button> */}
    </div>
  );
}
