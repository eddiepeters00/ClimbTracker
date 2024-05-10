import { getGyms } from "@/lib/mongoDb/gyms";
import Map from "@/components/map/map";

export default async function Page() {
  const gyms = await getGyms();

  return <>{gyms.gyms && <Map gyms={gyms.gyms} />}</>;
}
