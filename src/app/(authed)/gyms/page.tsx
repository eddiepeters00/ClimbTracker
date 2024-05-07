import Image from "next/image";
import man_bouldering from "../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import { getGyms } from "@/lib/mongoDb/gyms";
import GymCard from "./GymCard";

export default async function Page() {
  const gyms = await getGyms();
  console.log("All gyms: ", gyms);
  return (
    <section>
      <Image
        className="h-full object-cover absolute bg-blend-darken brightness-75 -z-10"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={man_bouldering}
      />
      <ul className="grid gap-6 mx-4 pt-8">
        {gyms.gyms?.map((gym) => (
          <li key={gym._id}>
            <GymCard gym={gym} />
          </li>
        ))}
      </ul>
    </section>
  );
}