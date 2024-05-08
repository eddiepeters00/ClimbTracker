"use client";

import { Button } from "@/components/ui/button";
import handleRoute from "./handleRoute";

export default function RouteButtons({ route_id }: { route_id: string }) {
  const handleTry = async () => {
    await handleRoute({ route_id: route_id, action: "try" });
  };

  const handleCompleted = async () => {
    await handleRoute({ route_id: route_id, action: "completed" });
  };

  return (
    <>
      <Button
        onClick={handleTry}
        className="bg-secondary text-center p-2 border rounded-sm font-medium px-20"
      >
        I tried...
      </Button>
      <Button
        onClick={handleCompleted}
        className="bg-primary text-center p-2 border rounded-sm font-medium"
      >
        I made it!
      </Button>
    </>
  );
}
