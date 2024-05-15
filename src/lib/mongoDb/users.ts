import { Collection, ObjectId } from "mongodb";
import clientPromise from ".";

let users: Collection<User>;

export type SavedRoute = {
  route_id: ObjectId;
  tries: number;
  times_completed: number;
  completed: boolean;
};

export type User = {
  _id?: ObjectId;
  name: string;
  email: string;
  picture?: string;
  saved_routes: SavedRoute[];
  achievements: ObjectId[];
};

async function init() {
  try {
    const client = await clientPromise;
    const db = await client.db();
    users = await db.collection<User>("users");
  } catch (error) {
    throw new Error("Failed to stablish connection to database");
  }
}

(async () => {
  await init();
})();

//Get all users
export async function getUsers() {
  try {
    if (!users) await init();
    const result = await users
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();

    return { users: result };
  } catch (error) {
    return { error: "Failed to fetch users" };
  }
}

//Get user by ID
export async function getCurrentUserByEmail({ email }: { email: string }) {
  try {
    if (!users) await init();
    const result = await users.findOne({ email: email });
    return { user: result };
  } catch (error) {
    return { error: "Failed to fetch current user" };
  }
}

//Add new user
export async function addNewUser(props: User) {
  try {
    if (!users) await init();

    //Check if user already exists exists
    const userExists = await users.findOne({
      email: props.email,
    });

    if (userExists !== null) throw new Error("User already exists");

    const doc = {
      name: props.name,
      email: props.email,
      picture: props.picture,
      saved_routes: [],
      achievements: [],
    };
    await users.insertOne(doc);
  } catch (error) {
    return { error: "Failed to add a new user" };
  }
}

//Find route in user by route id
export async function findRouteInUser({
  userId,
  routeId,
}: {
  userId: string;
  routeId: string;
}) {
  try {
    if (!users) await init();

    const result = await users.findOne({
      _id: new ObjectId(userId),
      "saved_routes.route_id": new ObjectId(routeId),
    });

    return { route: result?.saved_routes };
  } catch (error) {
    return { error: "Failed to update route in user" };
  }
}

//Get the saved route by id
export async function getSavedCurrentRoute({
  userId,
  routeId,
}: {
  userId: string;
  routeId: string;
}) {
  try {
    if (!users) await init();

    const result = await users.findOne({
      _id: new ObjectId(userId),
      "saved_routes.route_id": new ObjectId(routeId),
    });

    return {
      route: result?.saved_routes.find((savedRoute) =>
        savedRoute.route_id.equals(new ObjectId(routeId))
      ),
    };
  } catch (error) {
    return { error: "Failed to get route in user" };
  }
}

//Save route in saved_routes in user
export async function saveRoute({
  userId,
  routeId,
}: {
  userId: string;
  routeId: string;
}) {
  try {
    if (!users) await init();

    await users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $push: {
          saved_routes: {
            route_id: new ObjectId(routeId),
            completed: false,
            times_completed: 0,
            tries: 0,
          },
        },
      }
    );
  } catch (error) {
    return { error: "Failed to save a new route to user" };
  }
}

//Increment tries on a specific saved route
export async function addTryToRoute({
  userId,
  routeId,
}: {
  userId: string;
  routeId: string;
}) {
  try {
    if (!users) await init();

    const result = await users.findOneAndUpdate(
      {
        _id: new ObjectId(userId),
        "saved_routes.route_id": new ObjectId(routeId),
      },
      {
        $inc: {
          "saved_routes.$.tries": 1,
        },
      },
      { returnDocument: "after" }
    );
    return { route: result?.saved_routes[0] };
  } catch (error) {
    return { error: "Failed to increment tries on route" };
  }
}

//Increment completed_climbs on a specific saved route
export async function addCompletedRoute({
  userId,
  routeId,
}: {
  userId: string;
  routeId: string;
}) {
  try {
    if (!users) await init();

    const result = await users.findOneAndUpdate(
      {
        _id: new ObjectId(userId),
        "saved_routes.route_id": new ObjectId(routeId),
      },
      {
        $inc: {
          "saved_routes.$.times_completed": 1,
        },
        $set: { "saved_routes.$.completed": true },
      },
      { returnDocument: "after" }
    );

    return { route: result?.saved_routes[0] };
  } catch (error) {
    return { error: "Failed to update route with completed climb" };
  }
}

//Get users achievements
export async function getUserAchievements({ userId }: { userId: string }) {
  try {
    if (!users) await init();

    const user = await users.findOne({
      _id: new ObjectId(userId),
    });

    return {
      achievements:
        user?.achievements.map((achievements) => achievements.toString()) ?? [],
    };
  } catch (error) {
    return { error: "Failed to fetch user achievements" };
  }
}

//Insert achievements to user
export async function addAchievementToUser({
  userId,
  achievementId,
}: {
  userId: string;
  achievementId: ObjectId;
}) {
  try {
    if (!users) await init();

    const user = await users.findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      { $push: { achievements: achievementId } }
    );

    return {
      achievements:
        user?.achievements.map((achievements) => achievements.toString()) ?? [],
    };
  } catch (error) {
    return { error: "Failed to fetch user achievements" };
  }
}
