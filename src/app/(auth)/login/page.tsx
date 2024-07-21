import Link from "next/link";
import React from "react";
import OauthButton from "@/components/auth/OauthButton";

export default function Login() {
  return (
    <div className="flex">
      <div className="bg-secondary/15 hidden h-screen grow lg:block" />
      <div className="bg-background h-screen w-full lg:w-1/2">
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-md p-8">
            <h1 className="mb-4 text-2xl font-semibold">Login</h1>
              <OauthButton provider={"google"} />
          </div>
        </div>
      </div>
    </div>
  );
}