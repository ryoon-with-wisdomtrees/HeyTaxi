import React, { useContext, useEffect, useState } from "react";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";

type Props = {};
const session_token = "0e046701-55c5-4561-88c0-fe8ed190a09f";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";

const AutoCompleteAddress = (props: Props) => {
  const [source, setSource] = useState<any>("");
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );

  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDistination] = useState<any>();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  const getAddressList = async () => {
    setAddressList([]); // 초기화
    const query = sourceChange ? source : destination;
    console.log("query:", query);
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("result", res);
    const result = await res.json();
    console.log("result result", result);
    setAddressList(result);
  };

  const onSourceAddressClick = async (item: any) => {
    console.log(item);
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false);
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();

    console.log("onSourceAddressClick result\n", result);
    setSourceCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log(result);
  };

  const onDestinationAddressClick = async (item: any) => {
    console.log(item);
    setDistination(item.full_address);
    setAddressList([]);
    setDestinationChange(false);
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();

    setDestinationCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log(result);
  };

  return (
    <div className="">
      <div className="relative">
        <label className="text-gray-400 text-[13px]">Where From?</label>
        <input
          type="text"
          className="bg-white p-1 
                border-[1px] w-full 
                rounded-md outline-none
                focus:border-yellow-300 text-[14px]"
          value={source}
          onChange={(e) => {
            console.log("e.target.value:", e.target.value);
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />
        {addressList?.suggestions && sourceChange ? (
          <div
            className="shadow-md p-1 text-neutral-800 font rounded-md
            absolute w-full bg-white z-[9000]"
          >
            {addressList?.suggestions.map((item: any, index: number) => {
              console.log("{item}", item);
              return (
                <div
                  className="p-3  z-[9999] text-neutral-900 hover:bg-gray-100
                cursor-pointer"
                >
                  <h2
                    key={index}
                    className=""
                    onClick={() => {
                      onSourceAddressClick(item);
                    }}
                  >
                    {item.name}
                  </h2>
                  <p className="text-[10px]">{item.place_formatted}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="relative">
        <label className="text-gray-400 text-[13px]">Where To?</label>
        <input
          type="text"
          className="bg-white p-1 
                border-[1px] w-full 
                rounded-md outline-none
                focus:border-yellow-300 text-[14px]"
          value={destination}
          onChange={(e) => {
            setDistination(e.target.value);
            setDestinationChange(true);
          }}
        />

        {addressList?.suggestions && destinationChange ? (
          <div
            className="shadow-md p-1 rounded-md
            absolute w-full bg-white text-neutral-900"
          >
            {addressList?.suggestions.map((item: any, index: number) => (
              <div
                className="p-3 z-[9999] text-neutral-900 hover:bg-gray-100
                            cursor-pointer"
              >
                <h2
                  key={index}
                  className=""
                  onClick={() => {
                    onDestinationAddressClick(item);
                  }}
                >
                  {item.name}
                </h2>
                <p className="text-[10px]">{item.place_formatted}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
