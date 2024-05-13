import { TotalProgress } from "@/app/(authed)/progress/page";
import { getAchievements } from "./mongoDb/achievements";
import { GymRoute, getAllRoutes } from "./mongoDb/gyms";
import { User } from "./mongoDb/users";
import { Document } from "mongodb";

type Achievement = {
  _id: string;
  icon: string;
  message: string;
};

type Props = {
  user: User;
};

export default async function updateAchievements({ user }: Props) {
  const achievements = await getAchievements();
  const routes = await getAllRoutes();

  const completedAchievements = [];

  if (achievements.achievements)
    for (const achievement of achievements.achievements) {
      //Check if the user has completed this achievement
      if (routes.routes)
        if (hasCompletedAchievement(routes.routes, achievement, user)) {
          completedAchievements.push(achievement);
        }
    }

  console.log("Completed achievements: ", completedAchievements);
}

//Function to check if the user has completed a specific achievement
function hasCompletedAchievement(
  routes: Document[],
  achievement: Achievement,
  user: User
): boolean {
  const completedRoutes = user.saved_routes.filter((route) => route.completed);

  switch (achievement._id) {
    case "6641c8b8fe9c1c970e949290": //Completed your first climb
      return completedRoutes.length >= 1;

    case "6641c954fe9c1c970e949291": //Completed 10 routes
      return completedRoutes.length >= 10;

    case "6641c964fe9c1c970e949293": //Completed 20 routes!
      return completedRoutes.length >= 20;

    case "6641c960fe9c1c970e949292": //Completed 5 routes graded 6A
      const completed6ARoutes = completedRoutes.filter((route) =>
        routes.find((r) => r.grade === "6A" && r._id === route.route_id)
      );
      return completed6ARoutes.length >= 5;

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
      const completed7CRoutes = completedRoutes.filter((route) =>
        routes.find((r) => r.grade === "7C" && r._id === route.route_id)
      );
      return completed7CRoutes.length >= 1;

    default:
      return false;
  }
}
