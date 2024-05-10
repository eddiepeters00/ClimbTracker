import Image from "next/image";
import man_bouldering from "../../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import { getCurrentRoute } from "@/lib/mongoDb/gyms";
import RouteButtons from "./RouteButtons";
import { getServerSession } from "next-auth";
import {
  getCurrentUserByEmail,
  getSavedCurrentRoute,
} from "@/lib/mongoDb/users";
import ProgressCard from "../../../../../components/ProgressCard";

export default async function Page({
  params: { id, route_id },
}: {
  params: { id: string; route_id: string };
}) {
  const session = await getServerSession();
  const user = await getCurrentUserByEmail({
    email: session?.user?.email ?? "",
  });

  const userId = user.user?._id.toString();

  const savedCurrentRoute = await getSavedCurrentRoute({
    userId: userId ?? "",
    routeId: route_id,
  });

  const currentRoute = await getCurrentRoute({ route_id });
  return (
    <section>
      <Image
        className="h-full object-cover absolute bg-blend-darken brightness-75 -z-10 inset-0"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={man_bouldering}
      />

      <div className="pt-10 grid place-content-between justify-center">
        <div>
          <h2 className="text-center font-semibold text-primary-foreground">
            {`${currentRoute.route?.name} ${currentRoute.route?.grade}`}
          </h2>
          <div className="m-5">
            <ProgressCard
              progress={{
                total_completed: savedCurrentRoute.route?.times_completed,
                total_tries: savedCurrentRoute.route?.tries,
                total_tries_completed: savedCurrentRoute.route?.times_completed,
              }}
            />
          </div>
        </div>

        <div className="grid place-content-center gap-4 m-10 mx-20">
          <RouteButtons route_id={route_id} />
        </div>
      </div>
    </section>
  );
}
