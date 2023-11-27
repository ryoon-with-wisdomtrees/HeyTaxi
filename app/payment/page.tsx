"use client";
import CheckoutForm from "@/components/payment/CheckoutForm";
import { CarSelectedAmountContext } from "@/context/CarSelectedAmountContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
type Props = {};

const page = (props: Props) => {
  const { carAmount, setCarAmount } = useContext(CarSelectedAmountContext);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY! as string
  );
  const options: any = {
    mode: "payment",
    amount: carAmount as number,
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={carAmount} />
    </Elements>
  );
};

export default page;
