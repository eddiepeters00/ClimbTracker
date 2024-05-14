"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import type { GymRoute } from "@/lib/mongoDb/gyms";
import { User } from "@/lib/mongoDb/users";
import Link from "next/link";

type GymRouteProps = {
  user: User | null | undefined;
  routes: GymRoute[] | undefined | null;
  gym_id: string;
  variant: "all" | "not_completed" | "recent";
};

export default function GymRouteCarousel({
  routes,
  gym_id,
  variant,
  user,
}: GymRouteProps) {
  let displayedRoutes;
  switch (variant) {
    case "all":
      displayedRoutes = routes;
      break;

    case "not_completed":
      const notCompletedRoutesIds = user?.saved_routes
        .filter((route) => !route.completed)
        .map((route) => route.route_id.toString());
      displayedRoutes = routes?.filter((route) =>
        notCompletedRoutesIds?.includes(route._id)
      );
      break;

    case "recent":
      const savedRoutes = user?.saved_routes;
      displayedRoutes = routes?.filter((route) =>
        savedRoutes?.some((r) => r.route_id.toString() === route._id)
      );
      break;

    default:
      break;
  }

  return (
    <>
      {displayedRoutes && displayedRoutes.length > 0 && (
        <>
          <h3 className="ml-6 mb-2 text-sm">
            {variant === "all"
              ? "All routes"
              : variant === "not_completed"
              ? "Not completed projects"
              : "Recent projects"}
          </h3>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="mx-2 opacity-80">
              {displayedRoutes.map((route) => (
                <Link
                  className="m-2"
                  style={{ backgroundColor: route.color ?? "black" }}
                  key={route._id}
                  href={`/gyms/${gym_id}/${route._id}`}
                >
                  <CarouselItem
                    className={`basis-1/3 p-2 text-center grid text-lg font-extrabold mix-blend-difference`}
                  >
                    {route.name ?? "Testing name"}
                  </CarouselItem>
                </Link>
              ))}
            </CarouselContent>
          </Carousel>
        </>
      )}
    </>
  );
}
