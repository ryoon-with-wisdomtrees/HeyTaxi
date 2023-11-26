"use client";
import React, { useEffect } from "react";
import AutoCompleteAdress from "./AutoCompleteAdress";

type Props = {};

const Booking = (props: Props) => {
  useEffect(() => {
    const innerHeight = window.innerHeight * 0.72;
  }, []);
  //const screenHeight = window.innerHeight * 0.72; //스크롤업애기위해 일정 비율 곱하기
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: innerHeight }}
      >
        <AutoCompleteAdress />
        {/**이부분에 MapBox search api implement */}
      </div>
    </div>
  );
};

export default Booking;
