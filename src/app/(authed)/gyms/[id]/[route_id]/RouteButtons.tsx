"use client";

import { Button } from "@/components/ui/button";

export default function RouteButtons() {
  const handleTryClick = () => {
    console.log("Clicked try");
  };

  const handleCompletedClick = () => {
    checkIsRouteSaved();
    console.log("Clicked completed");
  };

  const checkIsRouteSaved = () => {
    return;
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
