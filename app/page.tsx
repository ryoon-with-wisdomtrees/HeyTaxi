"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
const Booking = dynamic(() => import("@/components/Booking/Booking"), {
  ssr: false,
}); //ReferenceError: window is not defined 에러 이슈 수정
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { CarSelectedAmountContext } from "@/context/CarSelectedAmountContext";
import { useUser } from "@clerk/clerk-react";
import { redirect } from "next/navigation";
export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userLocation, setUserLocation] = useState<any>(null);

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  useEffect(() => {
    getUserLocation();
  }, []);
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position:", position);
      setUserLocation({
        lat: position!.coords!.latitude,
        lng: position!.coords!.longitude,
      });
    });
  };

  const [soruceCordinates, setSourceCordinates] = useState<any>([]);
  const [destinationCordinates, setDestinationCordinates] = useState<any>([]);
  const [directionData, setDirectionData] = useState<any>([]);
  const [carAmount, setCarAmount] = useState<any>();
  return (
    <div className="">
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordiContext.Provider
          value={{ soruceCordinates, setSourceCordinates }}
        >
          <DestinationCordiContext.Provider
            value={{ destinationCordinates, setDestinationCordinates }}
          >
            <DirectionDataContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <CarSelectedAmountContext.Provider
                value={{ carAmount, setCarAmount }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 bg-white">
                  <div className="">
                    <Booking />
                  </div>
                  <div className="col-span-2">
                    <MapBoxMap />
                  </div>
                </div>
              </CarSelectedAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationCordiContext.Provider>
        </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
