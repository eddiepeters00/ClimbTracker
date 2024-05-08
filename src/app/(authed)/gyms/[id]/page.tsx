import Image from "next/image";
import man_bouldering from "../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import GymRouteCarusell from "@/components/carusells/GymRouteCarousel";
import { getGym } from "@/lib/mongoDb/gyms";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const gym = await getGym({ gym_id: id });

  const allGymRoutes = gym.gym && gym.gym.routes;
  return (
    <section>
      <Image
        className="h-full object-cover absolute bg-blend-darken brightness-75 -z-10"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={man_bouldering}
      />

      <div className="pt-10 grid gap-10">
        <h2 className="text-center font-semibold text-primary-foreground">
          {gym.gym?.name}
        </h2>

        <div>
          <h3 className="ml-6 mb-2 text-sm">All routes</h3>
          <GymRouteCarusell routes={allGymRoutes} gym_id={gym.gym?._id ?? ""} />
        </div>
      </div>
    </section>
  );
}
