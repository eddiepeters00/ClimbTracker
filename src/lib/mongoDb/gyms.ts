import { Collection, ObjectId } from "mongodb";
import clientPromise from ".";

let gyms: Collection<Gym>;

export type Gym = {
  _id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  routes: GymRoute[];
};

export type GymRoute = {
  _id: string;
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

//Get all gyms
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

//Get gym by ID
export async function getGym({ gym_id }: { gym_id: string }) {
  try {
    if (!gyms) await init();
    const gymObjectId = new ObjectId(gym_id);
    const result = await gyms.findOne(gymObjectId);
    return { gym: result };
  } catch (error) {
    return { error: "Failed to fetch gym" };
  }
}

//Get route by ID
export async function getCurrentRoute({ route_id }: { route_id: string }) {
  try {
    if (!gyms) await init();
    const routeId = new ObjectId(route_id);
    const result = await gyms.findOne({
      "routes._id": routeId,
    });
    return { route: result?.routes[0] };
  } catch (error) {
    return { error: "Failed to fetch route" };
  }
}

export async function getAllRoutes() {
  try {
    if (!gyms) await init();
    const result = await gyms
      .aggregate([
        { $unwind: "$routes" },
        {
          $project: {
            gym_id: "$_id",
            gym_name: "$name",
            route_name: "$routes.name",
            description: "$routes.description",
            grade: "$routes.grade",
            color: "$routes.color",
            location: "$routes.location",
            lat: "$routes.lat",
            lng: "$routes.lng",
          },
        },
      ])
      .toArray();
    return { routes: result };
  } catch (error) {
    return { error: "Failed to fetch routes" };
  }
}
