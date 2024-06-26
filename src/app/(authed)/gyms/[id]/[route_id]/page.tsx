import Image from "next/image";
import man_bouldering from "../../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import { getCurrentRoute } from "@/lib/mongoDb/gyms";
import RouteButtons from "./RouteButtons";
import { getSavedCurrentRoute } from "@/lib/mongoDb/users";
import ProgressCard from "../../../../../components/ProgressCard";
import { Suspense } from "react";
import { CircleLoader } from "react-spinners";
import getCurrentUser from "@/app/helpers/getCurrentUser";
import BackButton from "@/components/BackButton";

export default async function Page({
  params: { id, route_id },
}: {
  params: { id: string; route_id: string };
}) {
  const user = await getCurrentUser();
  const userId = user?._id.toString();

  const savedCurrentRoute = await getSavedCurrentRoute({
    userId: userId ?? "",
    routeId: route_id,
  });

  const currentRoute = await getCurrentRoute({ route_id });
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

        <div className="pt-10 grid place-content-between justify-center">
          <div>
            <div className="grid items-center grid-cols-3 m-[0 auto]">
              <BackButton className="ml-6" />
              <h2 className="text-center font-semibold text-primary-foreground">
                {`${currentRoute.route?.name} ${currentRoute.route?.grade}`}
              </h2>
            </div>

            <div className="m-5">
              <ProgressCard
                currentRoute={savedCurrentRoute}
                userId={userId ?? ""}
                routeId={route_id}
              />
            </div>
          </div>

          <div className="grid place-content-center gap-4 m-10 mx-20">
            <RouteButtons route_id={route_id} />
          </div>
        </div>
      </section>
    </Suspense>
  );
}
