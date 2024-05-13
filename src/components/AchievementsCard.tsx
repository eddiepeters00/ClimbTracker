import { Achievement } from "@/lib/mongoDb/achievements";
import { Card } from "./ui/card";
import { Trophy, Medal, Award, Gem, Ribbon, Crown } from "lucide-react";

type Props = {
  achievements?: Achievement[];
  userAchievements?: string[];
};
export default function AchivementsCard({
  achievements,
  userAchievements,
}: Props) {
  /* eslint-disable react/jsx-key */
  const iconMap = new Map<string, JSX.Element>([
    ["trophy", <Trophy color="black" />],
    ["medal", <Medal color="black" />],
    ["award", <Award color="black" />],
    ["gem", <Gem color="black" />],
    ["ribbon", <Ribbon color="black" />],
    ["crown", <Crown color="black" />],
  ]);

  return (
    <Card className="p-4">
      <ul className="flex items-center justify-evenly">
        {achievements?.map((achievement) => (
          <li
            key={achievement._id}
            className={
              userAchievements?.includes(achievement._id)
                ? "blur-none"
                : "blur-sm"
            }
          >
            {iconMap.get(achievement.icon)}
          </li>
        ))}
      </ul>
    </Card>
  );
}
