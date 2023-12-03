"use client";
import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
function NavBar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  return (
    isSignedIn && (
      <div
        className="flex justify-between
     p-3 px-10 border-b-[1px] shadow-sm"
      >
        <div className="flex gap-10 items-center">
          <Image
            src="/hey-taxi.png"
            alt="logo"
            width={100}
            height={100}
            className="rounded-md"
            onClick={() => {
              router.push("/");
            }}
          />
          <div className="hidden md:flex gap-6">
            <h2
              className="hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all"
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </h2>
            <h2
              className="hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all"
            >
              History
            </h2>
            <h2
              className="hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all"
            >
              Help
            </h2>
          </div>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    )
  );
}

export default NavBar;
