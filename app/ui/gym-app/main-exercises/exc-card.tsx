"use client";
import { Exercise } from "@/app/lib/definitions";
import MusclePill from "../../muscle-pill";
import { Button } from "../../button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { formatDateToLocal, NULL_PLACEHOLDER } from "@/app/lib/utils";
import styles from "@/app/ui/home.module.css";

export default function ExerciseCard({
  exercise,
}: {
  exercise: Exercise; // MainExercisesTableType[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <div className="mr-2 w-full">
        <p>{exercise.name}</p>
        <div className="flex flex-row flex-wrap">
          {exercise.target_muscles?.map((muscle) => {
            return muscle && <MusclePill key={muscle} text={muscle} />;
          })}
        </div>

        {/* Details */}
        {isExpanded && (
          <div className="mt-4 text-sm text-grey-400 p-2">
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
            <p>
              {`Last performed on ${
                exercise.last_performed
                  ? formatDateToLocal(exercise.last_performed)
                  : NULL_PLACEHOLDER
              }`}
            </p>
          </div>
        )}

        <Button className="w-full p-1 bg-zinc-500 m-1"> Add to today</Button>
      </div>
      <button
        className="text-sm active:bg-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400 justify-end mr-1 active:outline-purple-600" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400 justify-end mr-1 active:outline-purple-600" />
        )}
      </button>
    </div>
  );
}
