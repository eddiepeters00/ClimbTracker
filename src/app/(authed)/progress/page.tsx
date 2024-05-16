import Image from "next/image";
import person_climbing_outside from "../../../../public/248.jpg";
import AvatarContainer from "./AvatarContainer";
import { getUserAchievements } from "@/lib/mongoDb/users";
import AchivementsCard from "@/components/AchievementsCard";
import { getAchievements } from "@/lib/mongoDb/achievements";
import { Suspense } from "react";
import { CircleLoader } from "react-spinners";
import getCurrentUser from "@/app/helpers/getCurrentUser";
import TotalProgressCard from "@/components/TotalProgressCard";

export type TotalProgress = {
  times_completed: number;
  tries: number;
};

export type TotalTriesCompleted = Pick<TotalProgress, "times_completed">;

export default async function Page() {
  const user = await getCurrentUser();

  const achievements = await getAchievements();
  const userAchievements = await getUserAchievements({
    userId: user?._id.toString() ?? "",
  });

  const totalCompletedRoutes = user?.saved_routes.filter(
    (route) => route.completed
  ).length;

  const totalTries =
    user?.saved_routes.reduce(
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
    user?.saved_routes.reduce(
      (prev: TotalTriesCompleted, curr: TotalTriesCompleted) => ({
        times_completed: prev.times_completed + curr.times_completed,
      }),
      {
        times_completed: 0,
      }
    )?.times_completed ?? 0;

  return (
    <Suspense
      fallback={
        <CircleLoader color="#36d7b7" className="absolute top-1/2 right-1/2" />
      }
    >
      <section>
        <Image
          className="h-full object-cover absolute bg-blend-darken brightness-75 -z-10 inset-0"
          alt="Woman bouldering hanging on a wall with one arm loose"
          src={person_climbing_outside}
        />

        <div className="p-5">
          <AvatarContainer img={user?.picture ?? ""} name={user?.name ?? ""} />
        </div>

        <div className="mx-5 mt-5 grid gap-10">
          <div>
            <h2>Total Progress</h2>
            <TotalProgressCard
              progress={{
                total_completed: totalCompletedRoutes,
                total_tries: totalTries,
                total_tries_completed: totalTimesCompleted,
              }}
            />
          </div>

          <div>
            <h2>Achievements</h2>
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
