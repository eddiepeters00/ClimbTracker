"use server";

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

  if (!user.userId) return;

  const routeExists = await findRouteInUser({
    userId: user.userId,
    routeId: route_id,
  });

  //If route dosnt exist in user, save it
  if (!routeExists.route)
    return saveRoute({ userId: user.userId, routeId: route_id });

  let completedAction;
  if (action === "completed") {
    completedAction = await addCompletedRoute({
      userId: user.userId,
      routeId: route_id,
    });
  } else {
    completedAction = await addTryToRoute({
      userId: user.userId,
      routeId: route_id,
    });
  }
  return completedAction;
}
