import { Collection } from "mongodb";
import clientPromise from ".";

let achievement: Collection<Achievement>;
export type Achievement = {
  icon: string;
  completed: boolean;
  message: string;
  _id: string;
};

async function init() {
  try {
    const client = await clientPromise;
    const db = await client.db();
    achievement = await db.collection<Achievement>("achievements");
  } catch (error) {
    throw new Error("Failed to stablish connection to database");
  }
}

(async () => {
  await init();
})();

//Get all achievements
export async function getAchievements() {
  try {
    if (!achievement) await init();
    const result = await achievement
      .find({})
      .map((achievement) => ({
        ...achievement,
        _id: achievement._id.toString(),
      }))
      .toArray();

    return { achievements: result };
  } catch (error) {
    return { error: "Failed to fetch achievements" };
  }
}