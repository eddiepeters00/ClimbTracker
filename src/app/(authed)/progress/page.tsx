import Image from "next/image";
import person_climbing_outside from "../../../../public/248.jpg";
import AvatarContainer from "./AvatarContainer";
import { getServerSession } from "next-auth";
import { getCurrentUserByEmail } from "@/lib/mongoDb/users";
import ProgressCard from "@/components/ProgressCard";

type TotalProgress = {
  times_completed: number;
  tries: number;
};

type TotalTriesCompleted = Pick<TotalProgress, "times_completed">;

export default async function Page() {
  const session = await getServerSession();
  const user = await getCurrentUserByEmail({
    email: session?.user?.email ?? "",
  });

  const totalCompletedRoutes = user.user?.saved_routes.filter(
    (route) => route.completed
  ).length;

  const totalTries =
    user.user?.saved_routes.reduce(
      (prev: TotalProgress, curr: TotalProgress) => ({
        times_completed: prev.times_completed,
        tries: prev.tries + curr.tries,
      }),
      {
        times_completed: 0,
        tries: 0,
      }
    )?.tries ?? 0;

  const totalTimesCompleted =
    user.user?.saved_routes.reduce(
      (prev: TotalTriesCompleted, curr: TotalTriesCompleted) => ({
        times_completed: prev.times_completed + curr.times_completed,
      }),
      {
        times_completed: 0,
      }
    )?.times_completed ?? 0;

  return (
    <section>
      <Image
        className="h-full object-cover absolute bg-blend-darken brightness-75 -z-10"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={person_climbing_outside}
      />

      <div className="p-5">
        <AvatarContainer
          img={user.user?.picture ?? ""}
          name={user.user?.name ?? ""}
        />
      </div>

      <ProgressCard
        progress={{
          total_completed: totalCompletedRoutes,
          total_tries: totalTries,
          total_tries_completed: totalTimesCompleted,
        }}
      />
    </section>
  );
}
