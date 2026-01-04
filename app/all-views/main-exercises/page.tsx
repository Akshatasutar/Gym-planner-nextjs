import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "../../ui/fonts";
import { fetchExercises } from "@/app/lib/data-queries";
import ExercisesTable from "@/app/ui/gym-app/main-exercises/table";
import ExerciseCard from "@/app/ui/gym-app/main-exercises/exc-card";

export default async function Page() {
  const allExercisesList = await fetchExercises();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1
        className={`${lusitana.className} antialiased text-xl text-purple-900 md:text-3xl`}
      >
        All Exercises
      </h1>
      <p
        className={`${lusitana.className} antialiased text-m text-gray-800 md:text-m md:leading-normal p-6`}
      >
        <strong>This is the main exercises list.</strong> It is a list of all
        exercises I know, and have tried at some point. I pick exercises from
        here to add to the day's programme.
      </p>
      <div>
        {/* <ExercisesTable exercises={allExercisesList} /> */}
        {allExercisesList.map((exercise) => {
          return <ExerciseCard key={exercise.id} exercise={exercise} />;
        })}
      </div>
    </main>
  );
}
