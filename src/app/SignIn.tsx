"use client";

import Image from "next/image";
import Link from "next/link";
import woman_climbing from "../../public/full-shot-woman-climbing-wall.jpg";

export default function SigninRegister() {
  return (
    <main className="w-full grid justify-center content-between h-[100dvh]">
      <Image
        className="h-full object-cover w-full absolute -z-10 bg-blend-darken brightness-75"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={woman_climbing}
      />

      <h1 className="text-foreground text-center p-12 text-3xl font-semibold">
        ClimbTracker
      </h1>

      <div className="grid m-12">
        <Link
          href={"api/auth/signin"}
          className="bg-primary text-center p-2 border rounded-sm font-medium"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
