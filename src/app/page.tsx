import { getUsers } from "@/lib/mongoDb/users";

export default async function Home() {
  const users = await getUsers();
  console.log(users);

  return (
    <div>
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
