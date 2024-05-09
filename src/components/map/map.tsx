"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/navigation";
import { Gym } from "@/lib/mongoDb/gyms";

export default function Map({ gymProps }: { gymProps: Gym }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

      const position = {
        lat: gymProps.lat,
        lng: gymProps.lng,
      };

      //Map options
      const mapOptions = {
        center: position,
        zoom: 17,
        mapId: "365854c34f5924d0",
      };
      //Setup map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const infoWindow = new google.maps.InfoWindow({
        content: gymProps.name,
      });

      //Put up marker
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: gymProps.name,
      });
      infoWindow.open(map, marker);
      google.maps.event.addListener(marker, "click", function () {
        router.push(`/gyms/${gymProps._id}`);
      });
    };

    initMap();
  }, []);

  return <div className="h-[500px] text-black" ref={mapRef} />;
}
