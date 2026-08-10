"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Copy, Loader, Zap } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState({
    username: "",
    email: "",
  });
  const [showProfile, setShowProfile] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);
  const [changePasswordDisable, setChangePasswordDisable] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (data.email) {
      setChangePasswordDisable(false);
    } else {
      setChangePasswordDisable(true);
    }
  }, [data]);
  const logout = async () => {
    try {
      // set route
      await axios.get("/api/users/logout");
      // send to login page
      router.push("/login");
      toast.success("Logged out", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2000,
      });
      console.log("Logged out");
    } catch (error) {
      toast.error("Logout unsuccessful", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2000,
      });
      console.error("Logout unsuccessful: ", error.message);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      setShowProfile(!showProfile);

      // set route
      const response = await axios.get("/api/users/me");

      /* received data as response has the following structure
      response
      ├── data
      │   ├── message
      │   └── data
      │       ├── _id
      │       ├── username
      │       └── email
      ├── status
      ├── headers
      └── ...
      */
      setData(response.data.data);

      //router.push(`/profile/${response.data.data._id}`);

      console.log("User profile fetched");
    } catch (error) {
      toast.error("User profile fetch failed", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2000,
      });
      console.error("User profile fetch failed: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const maskEmail = (email) => {
    if (!email) {
      return "********";
    }
    const [username, domain] = email.split("@");

    if (!domain) return email;

    return username[0] + "*".repeat(6) + "@" + domain;
  };

  const copyToClipboard = async (value) => {
    console.log("Clipboard:", navigator.clipboard);
    console.log("Secure context:", window.isSecureContext);
    console.log("Value:", value);
    if (!value) {
      toast.error("nothing to copy");
      return "";
    }
    try {
      await navigator.clipboard.writeText(value);
      toast("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
      console.error("Failed to copy");
    }
  };

  const changePsssword = async () => {
    try {
      setLoading(true);
      await toast.promise(
        axios.post("api/users/validate-email", {
          email: data.email,
        }),
        {
          loading: "Sending email",
          success: "Email sent, check your email",
          error: "Email sending failed",
        },
      );

      logout();
      // logout after sending email
    } catch (error) {
      console.error("Email sending failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-primary-bg">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="flex flex-col rounded-xl m-4 p-6 bg-card-bg w-120 h-190 max-w-screen max-h-screen shadow-[0_0_2rem_#15181e]">
        <div className="flex justify-center items-center m-4 mb-8">
          <Zap className="bg-primary-btn rounded-full size-10 text-black"></Zap>
        </div>
        <h2 className="self-start ml-4 items-center text-2xl">username</h2>
        <div className="inline-flex justify-between items-center rounded-2xl bg-secondary-bg mt-4 mb-4">
          <input
            type="text"
            id="username"
            readOnly={true}
            value={showProfile ? data.username : ""}
            className=" flex justify-between text-xl mt-4 ml-4 p-2 focus:outline-none focus:border-none"
          />
          <button
            className="inline-flex p-3 border-none rounded-full m-2 hover:bg-gray-700"
            disabled={!data.username}
            onClick={() => {
              copyToClipboard(data.username);
            }}
          >
            <Copy className="text-gray-400 hover:text-primary-btn"></Copy>
          </button>
        </div>

        <h2 className="self-start row-span-1 col-span-4 ml-4 items-center text-2xl">
          email
        </h2>
        <div className="inline-flex justify-between items-center rounded-2xl bg-secondary-bg mt-4 mb-4">
          <input
            type="email"
            id="email"
            readOnly={true}
            value={
              showProfile && showEmail ? data.email : maskEmail(data.email)
            }
            className="inline-flex justify-self-start text-xl ml-4 p-2 focus:outline-none focus:border-none"
          />
          {showEmail ? (
            <button
              className="inline-flex justify-self-center self-center p-3 border-none rounded-full hover:bg-gray-700 m-2 text-black text-xl"
              onClick={() => {
                setShowEmail(!showEmail);
              }}
            >
              <EyeOff className="text-gray-400 hover:text-white"></EyeOff>
            </button>
          ) : (
            <button
              className="inline-flex justify-self-center self-center p-3 border-none rounded-full hover:bg-gray-700 m-2 text-black text-xl"
              onClick={() => {
                setShowEmail(!showEmail);
              }}
            >
              <Eye className="text-gray-400 hover:text-white"></Eye>
            </button>
          )}
          <button
            className="inline-flex justify-self-center self-center p-3 border-none rounded-full hover:bg-gray-700 m-2 text-black text-xl"
            disabled={!data.username}
            onClick={() => {
              copyToClipboard(data.username);
            }}
          >
            <Copy className="text-gray-400 hover:text-white"></Copy>
          </button>
        </div>
        <button
          className="flex justify-center items-center p-2 border-none rounded-2xl bg-primary-btn hover:cursor-pointer hover:shadow-[0_0_2rem_#f5f5f5] m-3 text-primary-btn-text text-xl"
          onClick={getProfile}
        >
          {loading ? (
            <Loader className="animate-spin text-primary-btn-text"></Loader>
          ) : (
            `${showProfile ? "Hide Profile" : "Get Profile"}`
          )}
        </button>
        <button
          disabled={changePasswordDisable}
          className={`flex justify-center items-center p-2 rounded-2xl m-3 text-xl ${changePasswordDisable ? "bg-disabled-btn text-disabled-btn-text hover:cursor-not-allowed" : " bg-primary-btn text-primary-btn-text hover:cursor-pointer hover:shadow-[0_0_2rem_#f5f5f5]"}`}
          onClick={changePsssword}
        >
          {loading ? (
            <Loader className="animate-spin text-black"></Loader>
          ) : (
            "Change Password"
          )}
        </button>
        <button
          className="flex p-2 border-none rounded-2xl justify-center items-center bg-secondary-btn hover:shadow-[0_0_2rem_#222222] hover:cursor-pointer m-3 text-secondary-btn-text text-xl"
          onClick={logout}
        >
          {loading ? (
            <Loader className="animate-spin self-center text-secondary-btn-text"></Loader>
          ) : (
            "Logout"
          )}
        </button>
        <p className="p-2 text-center mt-4 text-sm">© Copyrights 2026</p>
      </div>
    </div>
  );
}
