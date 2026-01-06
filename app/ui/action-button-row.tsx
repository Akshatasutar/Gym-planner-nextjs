"use client";
import { redirect } from "next/navigation";
import { deleteAllTodaysExercises } from "../lib/data-commands";
import { Button } from "./button";

export function ActionButtonRow() {
  const handleAddButtonClick = () => {
    redirect("/all-views/main-exercises");
  };

  const handleDeleteAllButtonClick = async () => {
    await deleteAllTodaysExercises();
  };

  return (
    <>
      <Button
        className="w-1/2 p-1 bg-zinc-600 m-1"
        onClick={handleAddButtonClick}
      >
        Add
      </Button>
      <Button
        className="w-1/2 p-1 bg-red-700 m-1"
        // disabled={todaysExercises.length == 0}
        onClick={() => handleDeleteAllButtonClick()}
      >
        Remove all
      </Button>
    </>
  );
}
