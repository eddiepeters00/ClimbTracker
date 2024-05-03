import { getUsers } from "@/lib/mongoDb/users";
import GymList from "./Gyms";

export default async function Gyms() {
  const users = await getUsers();
  return (
    <div>
      <GymList />
      <h1 className="text-black">GYMS page</h1>
      <ul>
        {users.users?.map((user) => (
          <li key={user._id}>
            {user.name} {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
