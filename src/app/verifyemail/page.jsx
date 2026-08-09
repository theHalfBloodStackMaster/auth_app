"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CircleArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("User verified", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2000,
      });
    } catch (error) {
      setError(true);
      console.log(error.response.data);
      toast.error("User not verified", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");
  }, [token]);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="flex flex-col w-full max-w-4xl items-center justify-center rounded-xl p-8 bg-gray-900 ring-2 ring-blue-500/50 ">
        <h1 className="text-4xl m-4 mb-6">Verify Email</h1>

        {/* <h2 className="p2 bg-orange-500 text-black rounded-lg p-2 m-2">
          {token ? `${token}` : "no token"}
        </h2> */}
        {verified && (
          <div>
            <h2 className="text-2xl m-2">Email verified</h2>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-2xl text-blue-500 m-2"
            >
              <span>Login</span>
              <CircleArrowRight className="size-12 text-blue-500 hover:cursor-pointer hover:animate-bounce-forward" />
            </Link>
          </div>
        )}
        {error && (
          <div className="flex justify-between">
            <h2 className="text-2xl bg-red-500 text-black rounded-lg m-2 p-2">
              Error
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
