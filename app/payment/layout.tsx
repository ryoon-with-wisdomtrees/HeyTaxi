"use client";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import { useState } from "react";
import { CarSelectedAmountContext } from "@/context/CarSelectedAmountContext";

const outfit = Outfit({ subsets: ["latin"] });

export default function PayLayout({ children }: { children: React.ReactNode }) {
  const [carAmount, setCarAmount] = useState<any>(1);
  return (
    <>
      <CarSelectedAmountContext.Provider value={{ carAmount, setCarAmount }}>
        {children}
      </CarSelectedAmountContext.Provider>
    </>
  );
}
