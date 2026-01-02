import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import GymNavLinks from "./nav-links";
// import { useState } from "react";

export default function GymSideNav() {
  // const [isMenuOpen, setIsMenuOpen] = useState(true);
  // TODO: Alter this to work on phone
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-purple-900 p-4 md:h-40"
        href="/"
      ></Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <GymNavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
      {/* <button
        onClick={() => {
          setIsMenuOpen(false);
        }}
      ></button> */}
    </div>
  );
}
