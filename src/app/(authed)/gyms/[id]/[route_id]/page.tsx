import Image from "next/image";
import man_bouldering from "../../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentRoute } from "@/lib/mongoDb/gyms";
import RouteButtons from "./RouteButtons";

export default async function Page({
  params: { id, route_id },
}: {
  params: { id: string; route_id: string };
}) {
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
          <Card className="mx-4 mt-10">
            <CardTitle className="text-black m-2 text-base font-light">
              Progress
            </CardTitle>
            <CardContent className="flex justify-around items-center gap-4">
              <div className="text-black grid place-content-center text-center">
                <span>0</span>
                <span className="text-sm font-light">Completed</span>
              </div>
              <div className="text-black grid place-content-center text-center">
                <span>0</span>
                <span className="text-sm font-light">Achievments</span>
              </div>
              <div className="text-black grid place-content-center text-center">
                <span>0</span>
                <span className="text-sm font-light">Attempts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid place-content-center gap-4 m-10 mx-20">
          <RouteButtons />
        </div>
      </div>
    </section>
  );
}
