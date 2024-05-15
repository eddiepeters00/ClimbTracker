"use client";

import { Button } from "@/components/ui/button";
import handleRoute from "./handleRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function RouteButtons({ route_id }: { route_id: string }) {
  const queryClient = useQueryClient();

  const completedMutation = useMutation({
    mutationFn: () => handleRoute({ route_id: route_id, action: "completed" }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["savedCurrentRoute"] });

      if (data && "achievements" in data) {
        if (data.achievements.unlockedAchievement) {
          toast.success("Unlocked achievement");
        }
      }
    },
  });
  const tryMutation = useMutation({
    mutationFn: () => handleRoute({ route_id: route_id, action: "try" }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["savedCurrentRoute"] });

      if (data && "achievements" in data) {
        if (data.achievements.unlockedAchievement) {
          toast.success("Unlocked achievement");
        }
      }
    },
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
