"use client";

import Image from "next/image";
import Link from "next/link";
import woman_climbing from "../../public/full-shot-woman-climbing-wall.jpg";

export default function SigninRegister() {
  return (
    <main className="w-full h-full grid justify-center content-between">
      <Image
        className="object-cover w-full h-full absolute -z-10 bg-blend-darken brightness-75"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={woman_climbing}
      />

      <h1 className="text-foreground text-center p-12 text-3xl font-semibold">
        ClimbTracker
      </h1>

      <div className="grid gap-6 m-12">
        <Link
          href={"/register"}
          className="bg-primary text-center p-2 rounded-sm font-medium"
        >
          Register
        </Link>
        <Link
          href={"/api/auth/signin"}
          className="bg-secondary text-center p-2 border rounded-sm font-medium"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
