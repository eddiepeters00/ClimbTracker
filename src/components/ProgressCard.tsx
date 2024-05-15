"use client";

import { Card } from "@/components/ui/card";
import { getSavedCurrentRoute } from "@/lib/mongoDb/users";
import { savedCurrentRoute } from "@/lib/queries/userQueries";
import { useQuery } from "@tanstack/react-query";

export default function ProgressCard({
  currentRoute,
  userId,
  routeId,
}: {
  currentRoute: Awaited<ReturnType<typeof getSavedCurrentRoute>>;
  userId: string;
  routeId: string;
}) {
  const { data } = useQuery({
    initialData: currentRoute.route,
    queryKey: ["savedCurrentRoute", { userId: userId, routeId: routeId }],
    queryFn: () => savedCurrentRoute({ userId: userId, routeId: routeId }),
  });

  let average_tries = 0;
  if (data?.times_completed && data.tries) {
    average_tries = data.times_completed / (data.tries + data.times_completed);
  }

  return (
    <Card className="p-4">
      <div className="flex justify-around items-center gap-4">
        <div className="text-black grid place-content-center text-center">
          <span>{data?.times_completed ?? 0}</span>
          <span className="text-sm font-light">Completed</span>
        </div>

        <div className="text-black grid place-content-center text-center">
          <span>{data?.tries ?? 0}</span>
          <span className="text-sm font-light">Sends</span>
        </div>

        <div className="text-black grid place-content-center text-center">
          <span>{`${average_tries.toFixed(2)} %`}</span>
          <span className="text-sm font-light">Average tries</span>
        </div>
      </div>
    </Card>
  );
}
