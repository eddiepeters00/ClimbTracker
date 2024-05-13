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

export default function GymRouteCarousel({ routes, gym_id }: GymRouteProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="mx-2 opacity-80">
        {routes?.map((route) => {
          return (
            <Link
              className="m-2"
              style={{ backgroundColor: route.color }}
              key={route._id}
              href={`/gyms/${gym_id}/${route._id}`}
            >
              <CarouselItem
                className={`basis-1/3 p-2 text-center grid text-lg font-extrabold mix-blend-difference`}
              >
                {route.name}
              </CarouselItem>
            </Link>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
