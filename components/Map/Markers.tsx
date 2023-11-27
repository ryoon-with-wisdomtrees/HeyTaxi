import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext } from "react";
import { Marker } from "react-map-gl";

type Props = {};

const Markers = (props: Props) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  return (
    <div>
      {soruceCordinates.length == 0 &&
        destinationCordinates.length == 0 &&
        userLocation !== null && (
          <Marker
            longitude={userLocation?.lng}
            latitude={userLocation?.lat}
            anchor="bottom"
          >
            <img src="./pin.png" className="w-10 h-10" />
          </Marker>
        )}

      {/** 출발지 마커*/}
      {soruceCordinates.length > 0 && (
        <Marker
          longitude={soruceCordinates?.lng}
          latitude={soruceCordinates?.lat}
          anchor="bottom"
        >
          <img src="./location.png" className="w-10 h-10" />
        </Marker>
      )}
      {/** 도착지 마커*/}
      {destinationCordinates.length > 0 && (
        <Marker
          longitude={destinationCordinates?.lng}
          latitude={destinationCordinates?.lat}
          anchor="bottom"
        >
          <img src="./location.png" className="w-10 h-10" />
        </Marker>
      )}
    </div>
  );
};

export default Markers;
