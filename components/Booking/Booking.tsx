import React from "react";
import AutoCompleteAdress from "./AutoCompleteAdress";

type Props = {};

const Booking = (props: Props) => {
  const screenHeight = window.innerHeight * 0.72; //스크롤업애기위해 일정 비율 곱하기
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: screenHeight }}
      >
        <AutoCompleteAdress />
      </div>
    </div>
  );
};

export default Booking;
