"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
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

      router.push("/redirect-page");
    } catch (error) {
      console.error("Email sending failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="grid grid-cols-4 grid-rows-9 rounded-xl bg-gray-900 ring-2 w-160 h-190 max-w-120 min-h-190 gap-0 ring-blue-500/50">
        <h2 className="self-center row-span-1 col-span-4 mt-4 ml-4 items-center text-2xl">
          username
        </h2>

        <input
          type="text"
          id="username"
          readOnly={true}
          value={showProfile ? data.username : ""}
          className="justify-self-start row-span-1 col-span-3 text-xl mt-4 ml-4 p-2 focus:outline-none focus:border-none"
        />
        <button
          className="justify-self-center self-center row-span-1 col-span-1 p-3 border-none rounded-full m-2 hover:bg-gray-700"
          disabled={!data.username}
          onClick={() => {
            copyToClipboard(data.username);
          }}
        >
          <Copy className="text-gray-400 hover:text-white"></Copy>
        </button>

        <h2 className="self-center row-span-1 col-span-4 ml-4 items-center text-2xl">
          email
        </h2>
        <input
          type="email"
          id="email"
          readOnly={true}
          value={showProfile && showEmail ? data.email : maskEmail(data.email)}
          className="justify-self-start row-span-1 col-span-2 text-xl ml-4 p-2 focus:outline-none focus:border-none"
        />
        {/* ask for system password before rvealing password */}
        {showEmail ? (
          <button
            className="justify-self-center self-center row-span-1 col-span-1 p-3 border-none rounded-full hover:bg-gray-700 m-2 text-black text-xl"
            onClick={() => {
              setShowEmail(!showEmail);
            }}
          >
            <EyeOff className="text-gray-400 hover:text-white"></EyeOff>
          </button>
        ) : (
          <button
            className="justify-self-center self-center row-span-1 col-span-1 p-3 border-none rounded-full hover:bg-gray-700 m-2 text-black text-xl"
            onClick={() => {
              setShowEmail(!showEmail);
            }}
          >
            <Eye className="text-gray-400 hover:text-white"></Eye>
          </button>
        )}
        <button
          className="justify-self-center self-center row-span-1 col-span-1 p-3 border-none rounded-full hover:bg-gray-700 m-2 text-black text-xl"
          disabled={!data.username}
          onClick={() => {
            copyToClipboard(data.username);
          }}
        >
          <Copy className="text-gray-400 hover:text-white"></Copy>
        </button>
        <button
          className="row-span-1 col-span-4 p-2 border-none rounded-2xl bg-emerald-600 hover:cursor-pointer hover:bg-emerald-500 m-3 text-black text-xl"
          onClick={getProfile}
        >
          {showProfile ? "Hide Profile" : "Get Profile"}
        </button>
        <button
          disabled={changePasswordDisable}
          className={`row-span-1 col-span-4 p-2 border rounded-2xl  m-3 text-xl ${changePasswordDisable ? "bg-gray-600 hover:cursor-not-allowed" : "border-blue-500 hover:cursor-pointer hover:bg-gray-700"}`}
          onClick={changePsssword}
        >
          Change Password
        </button>
        <button
          className="row-span-1 col-span-4 p-2 border-none rounded-2xl bg-red-600 hover:bg-red-500 hover:cursor-pointer  m-3 text-black text-xl"
          onClick={logout}
        >
          logout
        </button>
        <p className="row-span-1 col-span-4 p-2 text-center mt-4 text-sm">
          © Copyrights 2026
        </p>
      </div>
    </div>
  );
}
