"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useContext } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
type Props = {};

const MapBoxMap = (props: Props) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  return (
    <div>
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation !== null ? (
          <>
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: userLocation?.lng,
                latitude: userLocation?.lat,
                zoom: 14,
              }}
              style={{ width: "100%", height: 450, borderRadius: 10 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker
                longitude={userLocation?.lng}
                latitude={userLocation?.lat}
                anchor="bottom"
              >
                <img src="./pin.png" className="w-10 h-10" />
              </Marker>
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
