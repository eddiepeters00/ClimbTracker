import Image from "next/image";
import man_bouldering from "../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import GymRouteCarousel from "@/components/carousels/GymRouteCarousel";
import { getGym } from "@/lib/mongoDb/gyms";
import { Suspense } from "react";
import { CircleLoader } from "react-spinners";
import getCurrentUser from "@/app/helpers/getCurrentUser";
import BackButton from "@/components/BackButton";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  const gym = await getGym({ gym_id: id });
  const allGymRoutes = gym.gym && gym.gym.routes;
  return (
    <Suspense
      fallback={
        <CircleLoader color="#36d7b7" className="absolute top-1/2 right-1/2" />
      }
    >
      <section>
        <Image
          className="h-full w-full object-cover absolute bg-blend-darken brightness-75 -z-10 inset-0"
          alt="Woman bouldering hanging on a wall with one arm loose"
          src={man_bouldering}
        />

        <div className="pt-10 grid gap-10">
          <div className="grid items-center grid-cols-3 m-[0 auto]">
            <BackButton className="ml-6" />
            <h2 className="text-center font-semibold text-primary-foreground">
              {gym.gym?.name}
            </h2>
          </div>

          <div className="overflow-hidden">
            <GymRouteCarousel
              user={user}
              routes={allGymRoutes}
              gym_id={gym.gym?._id ?? ""}
              variant="recent"
            />
          </div>

          <div className="overflow-hidden">
            <GymRouteCarousel
              user={user}
              routes={allGymRoutes}
              gym_id={gym.gym?._id ?? ""}
              variant="not_completed"
            />
          </div>

          <div className="overflow-hidden">
            <GymRouteCarousel
              user={user}
              routes={allGymRoutes}
              gym_id={gym.gym?._id ?? ""}
              variant="all"
            />
          </div>
        </div>
      </section>
    </Suspense>
  );
}
