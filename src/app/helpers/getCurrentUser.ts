import { getCurrentUserByEmail } from "@/lib/mongoDb/users";
import { getServerSession } from "next-auth";

export default async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user?.email) return;
  const user = await getCurrentUserByEmail({ email: session.user.email });
  return user.user;
}
