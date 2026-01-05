import { lusitana } from "../../ui/fonts";
import { fetchFilteredExercises } from "@/app/lib/data-queries";
import ExerciseCard from "@/app/ui/gym-app/main-exercises/exc-card";
import Search from "@/app/ui/search";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  // const allExercisesList = await fetchAllExercises();
  const fiteredExercisesList = await fetchFilteredExercises(query || "");

  return (
    <main className="flex min-h-screen flex-col p-3">
      <h1
        className={`${lusitana.className} antialiased text-xl text-purple-900 md:text-3xl`}
      >
        All Exercises
      </h1>
      <p
        className={`${lusitana.className} antialiased text-m text-gray-800 md:text-m md:leading-normal p-4`}
      >
        <strong>The main exercises list.</strong> I pick exercises from here to
        add to the day's programme.
      </p>
      <div className="flex flex-row gap-2 flex-wrap">
        <Search placeholder="Search exercise name or muscle group..." />
      </div>
      <div>
        {fiteredExercisesList.map((exercise) => {
          return <ExerciseCard key={exercise.id} exercise={exercise} />;
        })}
      </div>
    </main>
  );
}
