"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/navigation";
import { Gym } from "@/lib/mongoDb/gyms";

export default function Map({ gyms }: { gyms: Gym[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  console.log(gyms);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      //Init marker
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      //Coordinates of Malmö
      const rootPosition = {
        lat: 55.60467789745106,
        lng: 13.009103980109412,
      };

      //Setup map
      const map = new Map(mapRef.current as HTMLDivElement, {
        center: rootPosition,
        zoom: 12,
        mapId: "365854c34f5924d0",
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        keyboardShortcuts: false,
      });

      gyms.forEach((gym) => {
        const infoWindow = new google.maps.InfoWindow({
          content: gym.name,
        });

        //Put up marker
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat: gym.lat, lng: gym.lng },
          title: gym.name,
        });

        infoWindow.open(map, marker);

        google.maps.event.addListener(marker, "click", function () {
          router.push(`/gyms/${gym._id}`);
        });
      });
    };

    initMap();
  }, []);

  return <div className="h-[82dvh] text-black" ref={mapRef} />;
}
