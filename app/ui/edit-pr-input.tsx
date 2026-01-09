"use-client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { updatePR } from "../lib/actions";

export default function EditPrInput({
  // todaysExerciseId,
  mainExerciseId,
  oldPr,
  setShowInput,
}: {
  // todaysExerciseId?: string;
  mainExerciseId: string;
  oldPr: number;
  setShowInput: (show: boolean) => void;
}) {
  const [prInputValue, setPrInputValue] = useState<number>(oldPr);
  const updatePrWithId = updatePR.bind(
    null,
    // todaysExerciseId ?? "",
    mainExerciseId,
    prInputValue ?? 0
  );

  const handlePrChange = useDebouncedCallback((input) => {
    setPrInputValue(input);
  }, 200);

  return (
    <form
      className="w-36 flex flex-row gap-2 items-center"
      action={updatePrWithId}
      onSubmit={() => setShowInput(false)}
    >
      <input
        className="w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"Enter new PR"}
        defaultValue={oldPr}
        type="number"
        onChange={(e) => handlePrChange(e.target.value)}
      />
      <button
        className="flex justify-center text-white items-center rounded-lg bg-green-700 p-3 text-sm h-6 w-10 active:bg-green-300"
        type="submit"
      >
        Save
      </button>
      <button
        className="flex justify-center text-white items-center rounded-lg bg-red-700 p-3 text-sm h-6 w-10 active:bg-red-300"
        type="reset"
        onClick={() => setShowInput(false)}
      >
        Close
      </button>
    </form>
  );
}
