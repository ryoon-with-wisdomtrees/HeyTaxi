import React, { useContext, useEffect, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { CarSelectedAmountContext } from "@/context/CarSelectedAmountContext";

type Props = {};

const Booking = (props: Props) => {
  useEffect(() => {
    const innerHeight = window.innerHeight * 0.72;
  }, []);
  const [amount, setAmount] = useState<any>();
  const router: any = useRouter();
  const { carAmount, setCarAmount } = useContext(CarSelectedAmountContext);
  //const screenHeight = window.innerHeight * 0.72; //스크롤업애기위해 일정 비율 곱하기
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: innerHeight }}
      >
        <AutoCompleteAddress />
        {/**이부분에 MapBox search api implement */}
        <Cars />
        <Cards />
        <button
          className={`w-full
         
        p-1 rounded-md
        mt-4 hover:text-white ${!carAmount ? "bg-gray-200" : "bg-yellow-400"}`}
          disabled={!carAmount}
          onClick={() => {
            router.push("/payment");
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
