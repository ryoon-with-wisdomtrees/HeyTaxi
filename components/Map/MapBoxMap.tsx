"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import type { MapRef } from "react-map-gl";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
type Props = {};

const MapBoxMap = (props: Props) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const mapRef = useRef<any>();
  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  useEffect(() => {
    if (soruceCordinates) {
      mapRef.current?.flyTo({
        center: [soruceCordinates.lng, soruceCordinates.lat],
        duration: 2500,
      });
    }
  }, [soruceCordinates]);

  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }
  }, [destinationCordinates]);

  return (
    <div>
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation !== null ? (
          <>
            <Map
              ref={mapRef}
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: userLocation?.lng,
                latitude: userLocation?.lat,
                zoom: 14,
              }}
              style={{ width: "100%", height: 450, borderRadius: 10 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Markers />
            </Map>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MapBoxMap;
