import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function ProgressCard() {
  return (
    <Card className="mx-4 mt-10">
      <CardTitle className="text-black m-2 text-base font-light">
        Progress
      </CardTitle>
      <CardContent className="flex justify-around items-center gap-4">
        <div className="text-black grid place-content-center text-center">
          <span>{0}</span>
          <span className="text-sm font-light">Completed</span>
        </div>
        <div className="text-black grid place-content-center text-center">
          <span>{0}</span>
          <span className="text-sm font-light">Achievments</span>
        </div>
        <div className="text-black grid place-content-center text-center">
          <span>{0}</span>
          <span className="text-sm font-light">Attempts</span>
        </div>
      </CardContent>
    </Card>
  );
}
