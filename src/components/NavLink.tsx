"use client";

import Link from "next/link";
import { Home, Dumbbell, Users, BarChart } from "lucide-react";

type LinkType = "home" | "gyms" | "community" | "progress";

export default function NavLink({ type }: { type: LinkType }) {
  return (
    <Link
      className="rounded-full aspect-square flex flex-col justify-center items-center"
      href={`/${type}`}
    >
      {type === "home" ? (
        <Home />
      ) : type === "gyms" ? (
        <Dumbbell />
      ) : type === "community" ? (
        <Users />
      ) : (
        <BarChart />
      )}
      <span className="text-center text-xs">{`${type.toUpperCase()}`}</span>
    </Link>
  );
}
