import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "../../ui/fonts";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-purple-900 p-4 md:h-52">
        <h1
          className={`${lusitana.className} antialiased text-xl text-gray-100 md:text-3xl`}
        >
          All Exercises
        </h1>
      </div>
      <div className="mt-4 flex grow flex-row gap-4 md:flex-row">
        <div className="flex flex-row justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} antialiased text-m text-gray-800 md:text-m md:leading-normal`}
          >
            <strong>This is the main exercises list.</strong> It is a list of
            all exercises I know, and have tried at some point. I pick exercises
            from here to add to the day's programme.
          </p>
        </div>
      </div>
    </main>
  );
}
