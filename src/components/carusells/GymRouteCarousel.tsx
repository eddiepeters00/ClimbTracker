"use client";

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

export default function GymRouteCarusel({ routes, gym_id }: GymRouteProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="mx-2">
        {routes?.map((route) => {
          console.log(route.color);
          return (
            <Link
              className="m-2"
              style={{ backgroundColor: route.color }}
              key={route._id}
              href={`/gyms/${gym_id}/${route._id}`}
            >
              <CarouselItem className={`basis-1/3 p-2 text-center grid`}>
                {route.name}
              </CarouselItem>
            </Link>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
