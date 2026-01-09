"use client";
import { redirect } from "next/navigation";
import { deleteAllTodaysExercises } from "../lib/actions";
import { Button } from "./button";

export function ActionButtonRow() {
  const handleAddButtonClick = () => {
    redirect("/all-views/main-exercises");
  };

  return (
    <form
      className="w-full flex flex-row gap-1"
      action={deleteAllTodaysExercises}
    >
      <Button
        className="w-1/2 p-1 bg-zinc-600 m-1"
        onClick={handleAddButtonClick}
      >
        Add
      </Button>

      <Button
        type="submit"
        className="w-1/2 p-1 bg-red-700 m-1"
        // disabled={todaysExercises.length == 0}
      >
        Remove all
      </Button>
    </form>
  );
}
