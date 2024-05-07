import type { User } from "@/lib/mongoDb/users";

export default function Profile(props: User) {
  return <div className="text-black">{props.name}</div>;
}
