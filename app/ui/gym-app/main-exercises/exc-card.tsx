"use client";
import { Exercise } from "@/app/lib/definitions";
import Search from "../../search";
import MusclePill from "../../muscle-pill";
import { Button } from "../../button";
import {
  ArrowDownCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { ArrowDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { formatDateToLocal, NULL_PLACEHOLDER } from "@/app/lib/utils";

export default function ExerciseCard({
  exercise,
}: {
  exercise: Exercise; // MainExercisesTableType[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-md bg-gray-50 p-2 mt-2 flex flex-row justify-between">
      <div>
        <p>{exercise.name}</p>
        <div className="flex flex-row">
          <MusclePill text={"hsdfgsdh"} />
          <MusclePill text={"blahh mooscley"} />
        </div>
        <Button className="w-full p-1 bg-zinc-500 m-1"> Add to today</Button>

        {/* Details */}
        {isExpanded && (
          // current PR , date of PR, last performed
          <div className="mt-4 text-sm text-grey-400">
            <p>
              PR{" : "}
              <b>
                <i>{exercise.current_pr}kg</i>
              </b>
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
