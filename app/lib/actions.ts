"use server";
// This has all "commands" - create, update and delete operations.
import postgres from "postgres";
import { z } from "zod";
import { Exercise } from "./definitions";
import { refresh, revalidatePath, revalidateTag } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Validate form data using ZOD - typechecking, before saving to database
const NewExerciseFormSchema = z.object({
  id: z.string(),
  exerciseName: z.string(),
  // muscleGroups: z.array(),
  muscleGroups: z.string(),
});

export async function addNewExercise(formdata: FormData) {
  //TODO: Get data from form data
  const { exerciseName, muscleGroups } = NewExerciseFormSchema.parse({
    exerciseName: formdata.get("exerciseName"),
    muscleGroups: formdata.get("mucleGroups"), // Change this to array later
  });
  // TODO: Insert row in exercises table
  await sql`
    INSERT INTO exercises (id, name)
      VALUES (${exerciseName})
  `;
  // Correct the above sql - it is just a placeholder
}

async function updateIsAddedForMainExerciseTrue(mainExerciseId: string) {
  try {
    await sql`
    UPDATE exercises
      SET is_added_to_today = true
      WHERE id = ${mainExerciseId}
  `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update isAdded data.");
  }
}

async function updateIsAddedForMainExerciseFalse(mainExerciseId: string) {
  try {
    await sql`
    UPDATE exercises
      SET is_added_to_today = false
      WHERE id = ${mainExerciseId}
  `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update isAdded data.");
  }
}

async function updateAllIsAddedFalse() {
  try {
    await sql`
    UPDATE exercises
      SET is_added_to_today = false
  `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update isAdded data for all exercises.");
  }
}

export async function addExerciseToTodaysList(exercise: Exercise) {
  const dateOfPr = exercise.date_of_pr ? new Date(exercise.date_of_pr) : null;
  try {
    await sql`
   INSERT INTO todays_exercises (exercise_name, pr, date_of_pr, is_completed, total_sets, finished_sets, main_exercise_id)
      VALUES (${exercise.name}, 
      ${exercise.current_pr || 0}, 
      ${dateOfPr}, 
      false, 
      3, 
      0,
      ${exercise.id}
      )
  `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add exercise to today.");
  }

  // Update column in main exercises
  updateIsAddedForMainExerciseTrue(exercise.id);

  // Update UI
  revalidatePath("/all-views/todays-exercises");
  revalidateTag("fetch-exercises", "max");
  revalidatePath("/all-views/main-exercises");
}

export async function deleteAllTodaysExercises() {
  try {
    await sql`
    DELETE FROM todays_exercises
  `;
    // Update all columns in main exercises
    updateAllIsAddedFalse();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete all today's exercises.");
  }

  // Update UI
  revalidatePath("/all-views/main-exercises");
  revalidateTag("fetch-exercises", "max");
}

export async function deleteTodaysExerciseWithId(
  exerciseId: string,
  mainExerciseId: string
) {
  try {
    await sql`
    DELETE FROM todays_exercises
    WHERE id = ${exerciseId}
  `;
    // Update "is added" column in main exercises
    updateIsAddedForMainExerciseFalse(mainExerciseId);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      "Failed to delete today's exercise with id" + `${exerciseId}`
    );
  }

  // Update UI
  revalidatePath("/all-views/main-exercises/[slug]", "page");
  revalidateTag("fetch-exercises", "max");
}
