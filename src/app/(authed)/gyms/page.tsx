import Image from "next/image";
import man_bouldering from "../../../../public/shirtless-sporty-male-climbing-indoor-climbing-wall.jpg";
import { Card, CardTitle } from "@/components/ui/card";
import { getGyms } from "@/lib/mongoDb/gyms";

export default async function Gyms() {
  const gyms = await getGyms();
  return (
    <section>
      <Image
        className="object-cover absolute bg-blend-darken brightness-75 -z-10"
        alt="Woman bouldering hanging on a wall with one arm loose"
        src={man_bouldering}
      />

      <ul className="grid gap-6 mx-4 pt-8">
        {gyms.gyms?.map((gym) => (
          <li key={gym._id}>
            <Card className=" flex justify-between items-center text-black h-10 p-2">
              <CardTitle className="text-lg font-medium">{gym.name}</CardTitle>
              <span className="">12/32</span>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
