import { getUsers } from "@/lib/mongoDb/users";

export default async function Gyms() {
  const users = await getUsers();
  return (
    <div>
      <h1 className="text-black">GYMS page</h1>
      <ul>
        {users.users?.map((user) => (
          <li className="text-black" key={user._id}>
            {user.name} {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
