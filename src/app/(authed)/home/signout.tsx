"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Signout() {
  return (
    <Button
      className="bg-slate-800"
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Sign out
    </Button>
  );
}
