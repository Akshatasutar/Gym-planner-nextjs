import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import {
  CustomersTableType,
  Exercise,
  FormattedCustomersTable,
  MainExercisesTableType,
} from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils";

export default async function ExercisesTable({
  exercises,
}: {
  exercises: Exercise[]; // MainExercisesTableType[];
}) {
  return (
    <div className={`w-full ${lusitana.className} antialiased`}>
      <div className="flex flex-row gap-4">
        <Search placeholder="Search by exercise name..." />
        <Search placeholder="Search muscle group..." />
      </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2">
              <table className=" min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-m font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      <strong>Name</strong>
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      <strong>Current PR (in kgs / reps for bodyweight)</strong>
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      <strong>Date of PR</strong>
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      <strong>Last Performed</strong>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {exercises.map((exercise) => (
                    <tr key={exercise.id} className="group">
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {exercise.name}
                        {/* <pill></pill>  */}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {exercise.current_pr}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {exercise.date_of_pr
                          ? formatDateToLocal(exercise.date_of_pr ?? "")
                          : "-"}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {exercise.last_performed
                          ? formatDateToLocal(exercise.last_performed ?? "")
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
