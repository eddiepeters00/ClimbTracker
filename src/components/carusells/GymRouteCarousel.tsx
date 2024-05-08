"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import type { GymRoute } from "@/lib/mongoDb/gyms";
import Link from "next/link";

type GymRouteProps = {
  routes: GymRoute[] | undefined | null;
  gym_id: string;
};

export default function GymRouteCarusell({ routes, gym_id }: GymRouteProps) {
  return (
    <Carousel>
      <CarouselContent className="mx-2">
        {routes?.map((route) => {
          return (
            <Link key={route._id} href={`/gyms/${gym_id}/${route._id}`}>
              <CarouselItem className={`basis-1/4`}>
                <Card className={`bg-${route.color}-400 relative p-2`}>
                  <span className="absolute top-0 left-0 p-1 text-xs mix-blend-difference">
                    {route.grade}
                  </span>
                  <CardContent className="grid place-content-center aspect-square p-0">
                    <span className="text-xs font-semibold mix-blend-difference">
                      {route.name}
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
            </Link>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
