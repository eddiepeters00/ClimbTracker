"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signout() {
  const router = useRouter();
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
