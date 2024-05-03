import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SigninRegister from "@/components/SigninRegister";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);

  return <>{session ? redirect("/gyms") : <SigninRegister />}</>;
}
