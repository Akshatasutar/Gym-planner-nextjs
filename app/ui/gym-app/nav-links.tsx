"use client";
import {
  HomeIcon,
  ClockIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/all-views", icon: HomeIcon },
  {
    name: "All exercises",
    href: "/all-views/main-exercises",
    icon: ListBulletIcon,
  },
  { name: "Todays plan", href: "/all-views/todays-exercises", icon: ClockIcon },
];

export default function GymNavLinks() {
  const pathName = usePathname();
  // TODO: Remove this line - test tets test - Do I trigger a deployment?
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-violet-100 hover:text-purple-600 active:text-purple-600 active:bg-transparent md:flex-none md:justify-start md:p-2 md:px-3",
              { "text-purple-600 bg-transparent": pathName === link.href }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
