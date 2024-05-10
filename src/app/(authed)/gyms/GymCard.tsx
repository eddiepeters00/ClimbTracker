"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Gym } from "@/lib/mongoDb/gyms";
import { SavedRoute } from "@/lib/mongoDb/users";
import Link from "next/link";

type GymCardProps = {
  gym: Gym;
};

export default function GymCard({ gym }: GymCardProps) {
  return (
    <Link href={`/gyms/${gym._id}`}>
      <Card className=" flex justify-between items-center text-black h-10 p-2">
        <CardTitle className="text-lg font-medium">{gym.name}</CardTitle>
      </Card>
    </Link>
  );
}
