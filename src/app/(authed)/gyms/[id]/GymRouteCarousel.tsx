"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { GymRoute } from "@/lib/mongoDb/gyms";

type GymRouteProps = {
  routes: GymRoute[] | undefined | null;
};

export default function GymRouteCarusell({ routes }: GymRouteProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="mx-2">
        {routes?.map((route, index) => (
          <CarouselItem key={route.id} className="basis-1/4 mx-2">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <span className="text-3xl font-semibold text-black">
                  {index + 1}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
