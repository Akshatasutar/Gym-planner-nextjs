import { fetchTodaysExercises } from "@/app/lib/data-queries";
import { ActionButtonRow } from "@/app/ui/action-button-row";
import TodaysExercisesCardList from "@/app/ui/gym-app/todays-exercises/todays-list";

export default async function Page() {
  const todaysExercises = await fetchTodaysExercises();

  return (
    <main>
      <h1 className={`antialiased text-xl text-purple-900 md:text-3xl`}>
        Today's Exercises
      </h1>
      <p> Here is today's workout plan</p>
      <ActionButtonRow />
      <TodaysExercisesCardList
        todaysExercises={todaysExercises}
        key={todaysExercises.length}
      />
    </main>
  );
}
