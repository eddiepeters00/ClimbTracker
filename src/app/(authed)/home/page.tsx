import { getGyms } from "@/lib/mongoDb/gyms";
import Map from "@/components/map/map";
import { Suspense } from "react";
import { CircleLoader } from "react-spinners";

export default async function Page() {
  const gyms = await getGyms();

  return (
    <Suspense
      fallback={
        <CircleLoader color="#36d7b7" className="absolute top-1/2 right-1/2" />
      }
    >
      {gyms.gyms && <Map gyms={gyms.gyms} />}
    </Suspense>
  );
}
