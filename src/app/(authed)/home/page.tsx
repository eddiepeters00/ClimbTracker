import { getServerSession } from "next-auth";
import Signout from "./signout";

export default async function Page() {
  const session = await getServerSession();
  return (
    <>
      <p className="text-black">
        Currently signed in as: {`${session?.user?.name}`}
      </p>
      <p className="text-black">Email: {`${session?.user?.email}`}</p>
      <Signout />
    </>
  );
}
