import { deleteAllTodaysExercises } from "@/app/lib/data-commands";
import { fetchTodaysExercises } from "@/app/lib/data-queries";
import { ActionButtonRow } from "@/app/ui/action-button-row";
import { Button } from "@/app/ui/button";
import TodaysExerciseCard from "@/app/ui/gym-app/todays-exercises/todays-exc-card";
import { redirect } from "next/navigation";

export default async function Page() {
  const todaysExercises = await fetchTodaysExercises();

  // const handleAddButtonClick = () => {
  //   redirect("/all-views/main-exercises");
  // };

  // const handleDeleteAllButtonClick = async () => {
  //   await deleteAllTodaysExercises();
  // };

  return (
    <main>
      <h1 className={`antialiased text-xl text-purple-900 md:text-3xl`}>
        Today's Exercises
      </h1>
      <p> Here is today's workout plan</p>
      <div className="flex flex-row gap-2">
        {/* <ActionButtonRow />
         */}
        <Button
          className="w-1/2 p-1 bg-zinc-600 m-1"
          // onClick={handleAddButtonClick}
        >
          Add
        </Button>
        <Button
          className="w-1/2 p-1 bg-red-700 m-1"
          disabled={todaysExercises.length == 0}
          onClick={deleteAllTodaysExercises}
        >
          Remove all
        </Button>
      </div>
      <div>
        {todaysExercises.map((exercise) => (
          <TodaysExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </main>
  );
}
