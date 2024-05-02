import { Button } from "@/components/ui/button";
import Image from "next/image";
import woman_climbing from "../../../public/full-shot-woman-climbing-wall.jpg";
export default function Auth() {
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
        <Button variant="default">Register</Button>
        <Button variant="outline" className="bg-[#0F172A] text-white">
          Sign in
        </Button>
      </div>
    </main>
  );
}
