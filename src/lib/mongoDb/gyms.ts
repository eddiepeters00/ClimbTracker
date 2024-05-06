import { Collection } from "mongodb";
import clientPromise from ".";

let gyms: Collection<Gym>;

export type Gym = {
  _id: string;
  name: string;
  location: string;
  routes: GymRoute[];
};

export type GymRoute = {
  id: string;
  name: string;
  grade: string;
  color?: string;
  description?: string;
};

async function init() {
  try {
    const client = await clientPromise;
    const db = await client.db();
    gyms = await db.collection<Gym>("gyms");
  } catch (error) {
    throw new Error("Failed to stablish connection to database");
  }
}

(async () => {
  await init();
})();

/////////////
/// Gyms ////
/////////////

export async function getGyms() {
  try {
    if (!gyms) await init();
    const result = await gyms
      .find({})
      .map((gym) => ({ ...gym, _id: gym._id.toString() }))
      .toArray();

    return { gyms: result };
  } catch (error) {
    return { error: "Failed to fetch gyms" };
  }
}
