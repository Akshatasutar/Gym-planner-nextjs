// This is an API basically - a controller
import postgres from "postgres";
import {
  CustomerField,
  CustomersTableType,
  Exercise,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  TodaysExercise,
} from "./definitions";
import { formatCurrency } from "./utils";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// This is a server component!! I think
export async function fetchFilteredExercises(query: string) {
  try {
    const exercisesData = await sql<Exercise[]>`
      SELECT 
        exercises.id,
        exercises.name AS name,
        current_pr,
        date_of_pr,
        last_performed,
        is_added_to_today,
        is_reps,
        array_agg(muscle_groups.name) AS target_muscles
      FROM exercises
        LEFT JOIN muscles_exercises_map ON exercises.id = muscles_exercises_map.exrcise_id
        LEFT JOIN muscle_groups ON muscles_exercises_map.muscle_group_id = muscle_groups.id
      GROUP BY exercises.id
      HAVING exercises.name ILIKE ${`%${query}%`} OR array_to_string(array_agg(muscle_groups.name),',') ILIKE ${`%${query}%`}
      ORDER BY last_performed desc nulls last`;

    return exercisesData;
  } catch (error) {
    console.error("Eror fetching data from database: ", error);
    throw new Error("Failed to fetch filtered exercise data.");
  }
}

export async function fetchTodaysExercises() {
  try {
    const todaysExercisesData = await sql<TodaysExercise[]>`
      SELECT 
        tex.id as id,
        main_exercise_id,
        mex.name as exercise_name,
        mex.current_pr as pr,
        mex.is_reps,
        mex.date_of_pr as date_of_pr,
        tex.total_sets,
        tex.finished_sets,
        tex.exercise_order
        FROM todays_exercises tex JOIN exercises mex
          ON tex.main_exercise_id = mex.id`;

    return todaysExercisesData;
  } catch (error) {
    console.error("Eror fetching data from database: ", error);
    throw new Error("Failed to fetch todays exercises data.");
  }
}
