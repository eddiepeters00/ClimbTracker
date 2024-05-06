import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SigninRegister from "./SignIn";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(options);

  return <>{session ? redirect("/home") : <SigninRegister />}</>;
}
