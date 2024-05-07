import { Collection, ObjectId } from "mongodb";
import clientPromise from ".";

let users: Collection<User>;
export type User = {
  name: string;
  email: string;
  picture?: string;
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
export async function getCurrentRoute({ userId }: { userId: string }) {
  try {
    if (!users) await init();
    const userObjectId = new ObjectId(userId);
    const result = await users.findOne(userObjectId);
    return { route: result };
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
    };
    await users.insertOne(doc);
    console.log("User inserted into DB");
  } catch (error) {
    return { error: "Failed to add a new user" };
  }
}
