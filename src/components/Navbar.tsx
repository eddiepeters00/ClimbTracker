import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <nav className="bg-primary-foreground text-black h-[10dvh] flex justify-evenly content-center">
      <NavLink type="home" />
      <NavLink type="gyms" />
      <NavLink type="community" />
      <NavLink type="progress" />
    </nav>
  );
}
