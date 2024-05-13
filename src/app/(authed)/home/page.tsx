import { getGyms } from "@/lib/mongoDb/gyms";
import Map from "@/components/map/map";
import { Suspense } from "react";
import { SkewLoader } from "react-spinners";

export default async function Page() {
  const gyms = await getGyms();

  return (
    <Suspense fallback={<SkewLoader />}>
      {gyms.gyms && <Map gyms={gyms.gyms} />}
    </Suspense>
  );
}
