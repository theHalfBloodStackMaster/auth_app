"use client"; // this makes the page/component which is on server side to the client side so that we can export client data
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Zap } from "lucide-react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  useEffect(() => {
    if (newPassword === confirmPassword && confirmPassword.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [newPassword, confirmPassword]);

  // first grab the token based on email
  const token = searchParams.get("token");

  const onSubmit = async () => {
    try {
      console.log("Token from reset password page = ", token);

      if (!token) {
        toast.error("Invalid token");
        console.error("Invalid token");
      }
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        console.error("Passwords do not match");
      }

      // send token and new password
      await toast.promise(
        axios.post("/api/users/reset-password", { token, newPassword }),
        {
          loading: "Reseting password",
          success: "Password reset successful",
          error: "Password reset failed",
        },
      );
      // push user on login page to login with new password
      router.push("/login");
    } catch (error) {
      toast.error("Password reset failed", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 6000,
      });
      console.log("Password reset failed: ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-primary-bg">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="flex flex-col rounded-2xl m-4 p-6 bg-card-bg max-w-screen max-h-screen shadow-[0_0_2rem_#15181e]">
        <div className="flex justify-center items-center m-4 mb-8">
          <Zap className="bg-primary-btn rounded-full size-10 text-black"></Zap>
        </div>
        <h1 className="text-center text-4xl mb-8">Reset Password</h1>
        <div>
          <label
            htmlFor="newPassowrd"
            className="flex justify-between m-2 p-1 text-xl border border-gray-600 rounded-lg mb-4 focus:outline-none"
          >
            <input
              className=" m-2 p-2 text-xl focus:outline-none"
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="new password"
            />
            <button
              onClick={() => {
                setShowNewPassword(!showNewPassword);
              }}
            >
              {showNewPassword ? (
                <EyeOff className="size-8 text-gray-600 hover:text-white"></EyeOff>
              ) : (
                <Eye className="size-8 text-gray-600 hover:text-white"></Eye>
              )}
            </button>
          </label>
        </div>
        <div>
          <label
            htmlFor="confirmPassowrd"
            className="flex justify-between m-2 p-1 text-xl border border-gray-600 rounded-lg mb-4"
          >
            <input
              className=" m-2 p-2 text-xl focus:outline-none "
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
            />
            <button
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-8 text-gray-600 hover:text-white"></EyeOff>
              ) : (
                <Eye className="size-8 text-gray-600 hover:text-white"></Eye>
              )}
            </button>
          </label>
        </div>
        <button
          disabled={buttonDisabled}
          className={`p-3 rounded-2xl m-2 mt-4 mb-4 focus:outline-none ${buttonDisabled ? "bg-disabled-btn text-disabled-btn-text cursor-not-allowed" : "bg-primary-btn text-primary-btn-text hover:shadow-[0_0_1rem_#f5f5f5] hover:cursor-pointer"}`}
          onClick={onSubmit}
        >
          Submit
        </button>
        <p className="text-sm text-center mt-4"> © Copyrights 2026</p>
      </div>
    </div>
  );
}
