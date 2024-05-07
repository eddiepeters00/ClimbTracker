"use client";

import { Button } from "@/components/ui/button";

export default function RouteButtons() {
  const handleTryClick = () => {
    console.log("Clicked try");
  };

  const handleCompletedClick = () => {
    console.log("Clicked completed");
  };

  return (
    <>
      <Button
        onClick={handleTryClick}
        className="bg-secondary text-center p-2 border rounded-sm font-medium"
      >
        I made a solid try...
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
