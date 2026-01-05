import { TodaysExercise } from "@/app/lib/definitions";
import TodaysExerciseCard from "@/app/ui/gym-app/todays-exercises/todays-exc-card";

const placeholderTodaysExs = [
  {
    id: "fgdjghdfghdf",
    name: "Lunges test",
    current_pr: 20,
    date_of_pr: "2025-11-25",
    sets: 3,
    is_completed: false,
  },
  {
    id: "fgdjghdfghdf",
    name: "Lat pull downs testest",
    current_pr: 25,
    date_of_pr: "2025-12-6",
    sets: 2,
    is_completed: true,
  },
] as TodaysExercise[];

export default function Page() {
  return (
    <main>
      <h1 className={`antialiased text-xl text-purple-900 md:text-3xl`}>
        Today's Exercises
      </h1>
      <p> Here is a list of exercises to do today. Aka today's workout plan</p>

      <div>
        {placeholderTodaysExs.map((exercise) => (
          <TodaysExerciseCard exercise={exercise} />
        ))}
      </div>
    </main>
  );
}
