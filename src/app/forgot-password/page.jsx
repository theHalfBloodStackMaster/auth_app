"use client"; // this makes the page/component which is on server side to the client side so that we can export client data
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    let loadingToast;
    try {
      setLoading(true);
      loadingToast = toast.loading("Validating Email", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      await axios.post("api/users/validate-email", { email: email });

      router.push("/login");
      toast.dismiss(loadingToast);
      toast.success("Email validated", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 6000,
      });
    } catch (error) {
      toast.error("Email not found", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 6000,
      });
      console.log("Email not found: ", error.message);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="flex flex-col justify-center rounded-xl p-8 bg-gray-900 ring-2 w-120 h-190 max-w-120 max-h-190 min-w-auto min-h-auto ring-blue-500/50">
        <input
          className="m-2 p-2 text-xl border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <button
          type="submit"
          disabled={!email}
          className={`p-3 rounded-2xl m-2 mb-4 focus:outline-none text-white ${email ? "bg-green-500 cursor-pointer" : "bg-gray-800"}`}
          onClick={onSubmit}
        >
          {loading ? (
            <Loader className="justify-self-center"></Loader>
          ) : (
            "Submit"
          )}
        </button>
        <div className="flex items-center gap-1 mt-10 m-2">
          <span className="flex-1 border border-top-1 border-gray-700"></span>
          <p className="text-gray-700 text-center text-lg">or</p>
          <span className="flex-1 border border-top-1 border-gray-700"></span>
        </div>
        <button
          className={`p-3 rounded-2xl border border-blue-500 text-blue-500 hover:bg-gray-700 m-2 mb-6 focus:outline-none cursor-pointer focus:border-gray-600`}
        >
          <Link href="/login">Login</Link>
        </button>
        <button
          className={`p-3 border border-blue-500 hover:bg-gray-800 rounded-2xl m-2 mt-1 mb-4 focus:outline-none focus:border-gray-600 text-blue-500 cursor-pointer`}
        >
          <Link href="/signup">Create new account</Link>
        </button>
        <p className="text-sm text-center mt-4"> © Copyrights 2026</p>
      </div>
    </div>
  );
}
