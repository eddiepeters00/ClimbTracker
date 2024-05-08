import Image from "next/image";
import man_bouldering from "../../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getCurrentRoute } from "@/lib/mongoDb/gyms";
import RouteButtons from "./RouteButtons";
import { getServerSession } from "next-auth";
import { getCurrentUserByEmail, findRouteInUser } from "@/lib/mongoDb/users";
import ProgressCard from "./ProgrssCard";

export default async function Page({
  params: { id, route_id },
}: {
  params: { id: string; route_id: string };
}) {
  const session = await getServerSession();
  const user = await getCurrentUserByEmail({
    email: session?.user?.email ?? "",
  });

  const savedCurrentRoute = await findRouteInUser({
    userId: user.userId ?? "",
    routeId: route_id,
  });

  const currentRoute = await getCurrentRoute({ route_id });
  console.log(currentRoute.route);
  return (
    <section className="grid h-[82dvh]">
      <Image
        className="h-full object-cover absolute bg-blend-darken brightness-75 -z-10"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={man_bouldering}
      />

      <div className="pt-10 grid place-content-between justify-center">
        <div>
          <h2 className="text-center font-semibold text-primary-foreground">
            {`${currentRoute.route?.name} ${currentRoute.route?.grade}`}
          </h2>
          <ProgressCard />
        </div>

        <div className="grid place-content-center gap-4 m-10 mx-20">
          <RouteButtons route_id={route_id} />
        </div>
      </div>
    </section>
  );
}
