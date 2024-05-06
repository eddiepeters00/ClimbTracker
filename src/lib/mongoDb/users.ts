import { Collection } from "mongodb";
import clientPromise from ".";

let users: Collection<User>;
type User = {
  id: string;
  name: string;
  email: string;
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
