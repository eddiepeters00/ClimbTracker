export default async function Page({
  params: { route_id },
}: {
  params: { route_id: string };
}) {
  console.log(`${route_id}`);
  return <section className="text-black">Selected route page</section>;
}
