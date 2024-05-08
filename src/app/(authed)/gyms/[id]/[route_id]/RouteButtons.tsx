"use client";

import { Button } from "@/components/ui/button";
import handleRoute from "./handleRoute";

export default function RouteButtons({ route_id }: { route_id: string }) {
  const handleTryClick = async () => {
    await handleRoute({ route_id: route_id, action: "try" });
    console.log("Clicked try");
  };

  const handleCompletedClick = async () => {
    await handleRoute({ route_id: route_id, action: "completed" });
    console.log("Clicked completed");
  };

  return (
    <>
      <Button
        onClick={handleTryClick}
        className="bg-secondary text-center p-2 border rounded-sm font-medium px-20"
      >
        I tried...
      </Button>
      <Button
        onClick={handleCompletedClick}
        className="bg-primary text-center p-2 border rounded-sm font-medium"
      >
        I made it!
      </Button>
    </>
  );
}
