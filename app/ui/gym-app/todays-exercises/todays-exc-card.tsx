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
import styles from "@/app/ui/home.module.css";
import { deleteTodaysExerciseWithId } from "@/app/lib/actions";
import EditPrInput from "../../edit-pr-input";

export default function TodaysExerciseCard({
  exercise,
}: {
  exercise: TodaysExercise;
}) {
  const [statusArray, setStatusArray] = useState<Array<boolean>>(
    new Array<boolean>(exercise.total_sets).fill(false)
  );
  const [isAllSetsCompleted, setIsAllSetsCompleted] = useState<boolean>(
    false
    // exercise.is_completed
  );
  const [showEditPrInput, setShowEditPrInput] = useState(false);

  // const handleDeleteIndividual = async () => {
  //   await deleteTodaysExerciseWithId(exercise.id, exercise.main_exercise_id);
  // };
  const handleDeleteIndividual = deleteTodaysExerciseWithId.bind(
    null,
    exercise.id,
    exercise.main_exercise_id
  );

  useEffect(() => {
    if (statusArray.every((isSetDone) => isSetDone))
      setIsAllSetsCompleted(true);
  }, [statusArray]);

  return (
    <div
      className={clsx(styles.card, "bg-gray-50", {
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
                  statusArray.map((oldItem, idx) => (idx == i ? true : oldItem))
                )
              }
            >
              <CheckCircleIcon
                className={clsx(
                  "h-8 w-8 text-gray-400 justify-end mr-1 active:outline-purple-600 ml-3 p-0 rounded-full",
                  { "bg-green-700 text-gray-50": isDone }
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
                // todaysExerciseId={exercise.id}
                mainExerciseId={exercise.main_exercise_id}
              />
            ) : (
              <>
                <b className="text-base">{exercise.pr}kg</b>

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
          className="flex items-center rounded-lg bg-red-700 p-3 text-sm h-6 w-10 active:bg-red-300 disabled:bg-gray-400"
          // onClick={() => handleDeleteIndividual()}
          disabled={isAllSetsCompleted}
        >
          <TrashIcon className="h-5 w-5 text-gray-50 active:outline-purple-600" />
        </button>
      </form>
    </div>
  );
}
