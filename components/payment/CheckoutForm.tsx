import {
  useElements,
  useStripe,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React from "react";

type Props = {};

//https://stripe.com/docs/stripe-js/react
const CheckoutForm = ({ amount }: any) => {
  const stripe: any = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDafault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      return;
    }
    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });

    const secretKey = await res.json();
    console.log(secretKey);

    const { error } = await stripe!.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
        return_url: "https://hey-taxi.vercel.app/",
      },
    });
  };
  return (
    <div className="flex flex-col justify-center items-center w-full mt-5">
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="w-full bg-yellow-500 p-2 rounded-lg mt-2"
        >
          pay
        </button>{" "}
      </form>
    </div>
  );
};

export default CheckoutForm;
