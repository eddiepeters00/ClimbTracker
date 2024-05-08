import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SavedRoute } from "@/lib/mongoDb/users";

export default function ProgressCard({
  currentRoute,
}: {
  currentRoute: SavedRoute | undefined;
}) {
  return (
    <Card className="m-5 p-4">
      <div className="flex justify-around items-center gap-4">
        <div className="text-black grid place-content-center text-center">
          <span>{currentRoute?.times_completed ?? 0}</span>
          <span className="text-sm font-light">Completed</span>
        </div>
        <div className="text-black grid place-content-center text-center">
          <span>{currentRoute?.tries ?? 0}</span>
          <span className="text-sm font-light">Achievments</span>
        </div>
        <div className="text-black grid place-content-center text-center">
          <span>{currentRoute?.tries ?? 0}</span>
          <span className="text-sm font-light">Attempts</span>
        </div>
      </div>
    </Card>
  );
}
