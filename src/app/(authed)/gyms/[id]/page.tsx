import Image from "next/image";
import man_bouldering from "../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import GymRouteCarusell from "./GymRouteCarousel";
import { getGym } from "@/lib/mongoDb/gyms";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log("Params: ", id);
  //Fetch routes from gym with id
  const gym = await getGym({ gym_id: id });
  console.log("GYM from ID: ", gym.gym);

  const allGymRoutes = gym.gym && gym.gym.routes;
  console.log("All gymroutes: ", allGymRoutes);
  return (
    <section>
      <Image
        className="object-cover absolute bg-blend-darken brightness-75 -z-10"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={man_bouldering}
      />

      <div className="pt-10 grid gap-10">
        <h2 className="text-center font-semibold text-primary-foreground">
          Malmö klättercenter
        </h2>
        <div>
          <h3 className="ml-6 mb-2 text-sm">Popular routes</h3>
          <GymRouteCarusell routes={allGymRoutes} />
        </div>

        <div>
          <h3 className="ml-6 mb-2 text-sm">Grade</h3>
          <GymRouteCarusell routes={allGymRoutes} />
        </div>

        <div>
          <h3 className="ml-6 mb-2 text-sm">All routes</h3>
          <GymRouteCarusell routes={allGymRoutes} />
        </div>
      </div>
    </section>
  );
}
