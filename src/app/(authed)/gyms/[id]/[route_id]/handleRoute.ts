"use server";

import updateAchievements from "@/lib/achievementLogic";
import {
  addCompletedRoute,
  addTryToRoute,
  findRouteInUser,
  getCurrentUserByEmail,
  saveRoute,
} from "@/lib/mongoDb/users";
import { getServerSession } from "next-auth";

export default async function handleRoute({
  route_id,
  action,
}: {
  route_id: string;
  action: "try" | "completed";
}) {
  const session = await getServerSession();
  const user = await getCurrentUserByEmail({
    email: session?.user?.email ?? "",
  });

  if (!user.user?._id) return;
  const userId = user.user._id.toString();

  const routeExists = await findRouteInUser({
    userId: userId,
    routeId: route_id,
  });

  //If route dosnt exist in user, save it
  if (!routeExists.route)
    return saveRoute({ userId: userId, routeId: route_id });

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
  const updatedAchievement = await updateAchievements({ user: user.user });
  console.log("[HANDLE-ROUTE] - UPDATED ACHIEVEMENT: ", updatedAchievement);
  return completedAction;
}
