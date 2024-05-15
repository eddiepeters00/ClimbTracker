"use server";

import { getSavedCurrentRoute } from "../mongoDb/users";

export const savedCurrentRoute = async ({
  userId,
  routeId,
}: {
  userId: string;
  routeId: string;
}) => {
  const data = await getSavedCurrentRoute({
    userId: userId,
    routeId: routeId,
  });

  return data.route;
};
