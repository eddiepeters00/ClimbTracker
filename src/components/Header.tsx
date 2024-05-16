"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className="bg-primary-foreground  p-2 grid place-content-center min-w-full w-full text-center relative">
      <h1 className="text-primary font-bold text-xl">Climb Tracker</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute right-0 top-0 p-2 text-black">
          <Settings aria-label="Settings" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-black">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Sign out"
            className="flex items-center gap-2 text-black"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="p-1" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
