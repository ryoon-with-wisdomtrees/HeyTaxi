"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import type { MapRef } from "react-map-gl";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { MAPBOX_DRIVING_ENDPOINT } from "@/utils/constants";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxDrawRoute from "./MapBoxDrawRoute";

type Props = {};

const MapBoxMap = (props: Props) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const mapRef = useRef<any>();
  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
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

    if (soruceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);

  const getDirectionRoute = async () => {
    //https://docs.mapbox.com/api/navigation/directions/
    //https://docs.mapbox.com/help/tutorials/getting-started-directions-api/
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        soruceCordinates.lng +
        "," +
        soruceCordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        // "https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);
    console.log(result.routes);
    setDirectionData(result);
  };

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

              {directionData?.routes && (
                <MapBoxDrawRoute
                  coordinates={directionData?.routes[0]?.geometry?.coordinates}
                />
              )}
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
