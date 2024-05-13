import Image from "next/image";
import person_climbing_outside from "../../../../public/248.jpg";
import AvatarContainer from "./AvatarContainer";
import { getServerSession } from "next-auth";
import {
  getCurrentUserByEmail,
  getUserAchievements,
} from "@/lib/mongoDb/users";
import ProgressCard from "@/components/ProgressCard";
import AchivementsCard from "@/components/AchievementsCard";
import { getAchievements } from "@/lib/mongoDb/achievements";
import { Suspense } from "react";
import { SkewLoader } from "react-spinners";

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

  const achievements = await getAchievements();
  const userAchievements = await getUserAchievements({
    userId: user.user?._id.toString() ?? "",
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
    <Suspense fallback={<SkewLoader color="#36d7b7" />}>
      <section>
        <Image
          className="h-full object-cover absolute bg-blend-darken brightness-75 -z-10 inset-0"
          alt="Woman bouldering hanging on a wall with one arm loose"
          src={person_climbing_outside}
        />

        <div className="p-5">
          <AvatarContainer
            img={user.user?.picture ?? ""}
            name={user.user?.name ?? ""}
          />
        </div>

        <div className="mx-5 mt-5 grid gap-10">
          <div>
            <h3>Total Progress</h3>
            <ProgressCard
              progress={{
                total_completed: totalCompletedRoutes,
                total_tries: totalTries,
                total_tries_completed: totalTimesCompleted,
              }}
            />
          </div>

          <div>
            <h3>Achievements</h3>
            <AchivementsCard
              achievements={achievements.achievements}
              userAchievements={userAchievements.achievements}
            />
          </div>
        </div>
      </section>
    </Suspense>
  );
}
