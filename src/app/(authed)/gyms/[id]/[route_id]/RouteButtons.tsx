"use client";

import { Button } from "@/components/ui/button";
import handleRoute from "./handleRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RouteButtons({ route_id }: { route_id: string }) {
  const queryClient = useQueryClient();

  const completedMutation = useMutation({
    mutationFn: () => handleRoute({ route_id: route_id, action: "completed" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["savedCurrentRoute"] }),
  });
  const tryMutation = useMutation({
    mutationFn: () => handleRoute({ route_id: route_id, action: "try" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["savedCurrentRoute"] }),
  });

  return (
    <>
      <Button
        onClick={async () => await tryMutation.mutateAsync()}
        className="bg-secondary text-center p-2 border rounded-sm font-medium px-20"
      >
        I tried...
      </Button>
      <Button
        onClick={async () => await completedMutation.mutateAsync()}
        className="bg-primary text-center p-2 border rounded-sm font-medium"
      >
        I made it!
      </Button>
    </>
  );
}
