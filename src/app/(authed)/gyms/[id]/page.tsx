import Image from "next/image";
import man_bouldering from "../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import { ArrowLeft } from "lucide-react";
import GymRouteCarusell from "./GymRouteCarousel";

export default async function Page() {
  return (
    <section>
      <Image
        className="object-cover absolute bg-blend-darken brightness-75 -z-10"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={man_bouldering}
      />

      <div className="flex justify-center">
        <ArrowLeft />
        <h3>Malmö klättergym</h3>
      </div>

      <div className="grid pt-10 gap-24">
        <GymRouteCarusell />
        <GymRouteCarusell />
        <GymRouteCarusell />
      </div>
    </section>
  );
}
