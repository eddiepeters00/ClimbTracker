"use server";
import { TotalProgress } from "@/app/(authed)/progress/page";
import { getAchievements, Achievement } from "./mongoDb/achievements";
import { getAllRoutes } from "./mongoDb/gyms";
import { User, addAchievementToUser } from "./mongoDb/users";
import { Document } from "mongodb";

type Props = {
  user: User;
};

export default async function updateAchievements({ user }: Props) {
  const achievements = await getAchievements();
  const routes = await getAllRoutes();

  if (achievements.achievements && routes.routes) {
    for (const achievement of achievements.achievements) {
      //Check if the user has completed this achievement
      if (hasCompletedAchievement(routes.routes, achievement, user)) {
        //Check if the user already has the achievement
        if (
          !user.achievements.some(
            (userAchievement) =>
              userAchievement.toString() === achievement._id.toString()
          )
        ) {
          await addAchievementToUser({
            userId: user._id?.toString() ?? "",
            achievementId: achievement._id,
          });

          return { unlockedAchievement: true };
        }
      }
    }
  }

  return { unlockedAchievement: false };
}

//Function to check if the user has completed a specific achievement
function hasCompletedAchievement(
  routes: Document[],
  achievement: Achievement,
  user: User
): boolean {
  const completedRoutes = user.saved_routes.filter((route) => route.completed);

  switch (achievement._id.toString()) {
    case "6641c8b8fe9c1c970e949290": //Completed your first climb
      return completedRoutes.length >= 1;

    case "6641c954fe9c1c970e949291": //Completed 10 routes
      return completedRoutes.length >= 10;

    case "6641c964fe9c1c970e949293": //Completed 20 routes!
      return completedRoutes.length >= 20;

    case "6641c960fe9c1c970e949292": //Completed 5 routes graded 6A
      return (
        completedRoutes.filter((route) =>
          routes.some(
            (r) =>
              r.grade === "6A" && r._id.toString() === route.route_id.toString()
          )
        ).length >= 5
      );

    case "6641c967fe9c1c970e949294": //Tried routes 100 times total
      const totalTries =
        user.saved_routes.reduce(
          (prev: TotalProgress, curr: TotalProgress) => ({
            times_completed: prev.times_completed,
            tries: prev.tries + curr.tries,
          }),
          {
            times_completed: 0,
            tries: 0,
          }
        )?.tries ?? 0;

      return totalTries >= 100;

    case "6641c96dfe9c1c970e949295": //Completed a 7C
      return (
        completedRoutes.filter((route) =>
          routes.some(
            (r) =>
              r.grade === "7C" && r._id.toString() === route.route_id.toString()
          )
        ).length > 0
      );

    default:
      return false;
  }
}
