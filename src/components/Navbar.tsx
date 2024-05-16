"use client";

import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <nav className="bg-primary-foreground text-black flex justify-evenly content-center static w-full">
      <NavLink type="home" />
      <NavLink type="gyms" />
      <NavLink type="community" />
      <NavLink type="progress" />
    </nav>
  );
}
