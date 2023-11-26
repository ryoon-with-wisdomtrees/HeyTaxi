"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const Booking = dynamic(() => import("@/components/Booking/Booking"), {
  ssr: false,
}); //ReferenceError: window is not defined 에러 이슈 수정

export default function Home() {
  return (
    <div>
      <div className="grid  grid-cols-1 md:grid-cols-3">
        <div className="">
          <Booking />
        </div>
        <div className="col-span-2 bg-red-100 ">Map</div>
      </div>
    </div>
  );
}
