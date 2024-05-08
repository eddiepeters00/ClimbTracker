"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMap = async () => {
      console.log("Map init");
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
        lat: 0,
        lng: 0,
      };

      //Map options
      const mapOptions = {
        center: position,
        zoom: 17,
        mapId: "home-map",
      };
      //Setup map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      //Put up marker
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
      });
    };

    initMap();
  }, []);

  return <div className="h-[500px]" ref={mapRef} />;
}
