import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SigninRegister from "./SignIn";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SkewLoader } from "react-spinners";

export default async function Page() {
  const session = await getServerSession(options);

  return (
    <Suspense fallback={<SkewLoader />}>
      {session ? redirect("/home") : <SigninRegister />}
    </Suspense>
  );
}
