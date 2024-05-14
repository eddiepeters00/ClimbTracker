import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SigninRegister from "./SignIn";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CircleLoader } from "react-spinners";

export default async function Page() {
  const session = await getServerSession(options);

  return (
    <Suspense
      fallback={
        <CircleLoader color="#36d7b7" className="absolute top-1/2 right-1/2" />
      }
    >
      {session ? redirect("/home") : <SigninRegister />}
    </Suspense>
  );
}
