"use server";

import getCurrentUser from "@/app/helpers/getCurrentUser";
import updateAchievements from "@/lib/achievementLogic";
import {
  addCompletedRoute,
  addTryToRoute,
  findRouteInUser,
  saveRoute,
} from "@/lib/mongoDb/users";

export default async function handleRoute({
  route_id,
  action,
}: {
  route_id: string;
  action: "try" | "completed";
}) {
  const user = await getCurrentUser();
  if (!user?._id) return;
  const userId = user._id.toString();

  const routeExists = await findRouteInUser({
    userId: userId,
    routeId: route_id,
  });

  //If route dosnt exist in user, save it
  if (!routeExists.route) saveRoute({ userId: userId, routeId: route_id });

  let completedAction;
  if (action === "completed") {
    completedAction = await addCompletedRoute({
      userId: userId,
      routeId: route_id,
    });
  } else {
    completedAction = await addTryToRoute({
      userId: userId,
      routeId: route_id,
    });
  }

  //Update achievements
  const achievements = await updateAchievements({ user: user });
  return { completedAction, achievements };
}
