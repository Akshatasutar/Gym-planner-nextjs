import postgres from "postgres";
import { Exercise } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const AddExercise = async () => {
  try {
    const addExercoseSqlCommand = await sql<
      Exercise[]
    >`SELECT * FROM exercises`;
    return addExercoseSqlCommand;
    // Actually return a boolean of whetehr the operation was successful
    // Maybe take a look at seed/route.ts -> This has insert operations
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add exercise data.");
  }
};
