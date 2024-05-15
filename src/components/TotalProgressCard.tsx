import { Card } from "@/components/ui/card";

export type ProgressProps = {
  total_completed: number | undefined;
  total_tries_completed: number | undefined;
  total_tries: number | undefined;
};

export default function TotalProgressCard({
  progress,
}: {
  progress: ProgressProps | undefined;
}) {
  let average_tries = 0;
  if (progress?.total_tries_completed && progress.total_tries) {
    average_tries =
      progress.total_tries_completed /
      (progress.total_tries + progress.total_tries_completed);
  }

  return (
    <Card className="p-4">
      <div className="flex justify-around items-center gap-4">
        <div className="text-black grid place-content-center text-center">
          <span>{progress?.total_completed ?? 0}</span>
          <span className="text-sm font-light">Completed</span>
        </div>

        <div className="text-black grid place-content-center text-center">
          <span>{progress?.total_tries ?? 0}</span>
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
