import Image from "next/image";
import man_bouldering from "../../../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function Page({
  params: { id, route_id },
}: {
  params: { id: string; route_id: string };
}) {
  console.log("PARAMS: ", id, route_id);
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
            Napoleon V6
          </h2>
          <Card className="mx-4 mt-10">
            <CardTitle>Total progress</CardTitle>
            <CardContent className="flex justify-around items-center">
              <div className="text-black">1</div>
              <Separator className="p-1 bg-black" orientation="vertical" />
              <div className="text-black">2</div>
              <Separator
                className="bg-black p-1 h-full"
                orientation="vertical"
              />
              <div className="text-black">3</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid place-content-center gap-4 m-10 mx-20">
          <Button className="bg-secondary text-center p-2 border rounded-sm font-medium">
            I made a solid try...
          </Button>
          <Button className="bg-primary text-center p-2 border rounded-sm font-medium">
            I made it!
          </Button>
        </div>
      </div>
    </section>
  );
}
