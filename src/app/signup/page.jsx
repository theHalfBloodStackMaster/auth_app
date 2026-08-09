"use client"; // this makes the page/component which is on server side to the client side so that we can export client data
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  // const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const loadingToast = toast.loading(`Signing In`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      // set the route
      const response = await axios.post("/api/users/signup", user);
      toast.dismiss(loadingToast);
      toast.success(`Signed up successfully`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2000,
      });
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed: ", error.message);
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  // enable button
  // useEffect(() => {
  //   if (
  //     user.username.length > 0 &&
  //     user.email.length > 0 &&
  //     user.password.length > 0
  //   ) {
  //     setButtonDisabled(false);
  //   } else {
  //     setButtonDisabled(true);
  //   }
  // }, [user]);
  const buttonDisabled =
    !user.username.trim() || !user.email.trim() || !user.password.trim();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div className="flex flex-col rounded-xl p-8 bg-gray-900 ring-2 w-120 h-190 max-w-120 max-h-190 min-w-auto min-h-auto ring-blue-500/50">
        <h1 className="text-6xl mb-8 text-center">Signup</h1>
        <input
          className="m-2 p-2 text-xl border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />

        <input
          className="m-2 p-2 text-xl border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label
          htmlFor="password"
          className="flex items-center justify-between border border-gray-600 rounded-lg m-2 mb-4 focus:outline-none p-2"
        >
          <input
            className="text-xl focus:outline-none focus:border-gray-600"
            type={showPassword ? "text" : "password"}
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          {showPassword ? (
            <button className="">
              <EyeOff
                className="text-gray-500 size-8 hover:text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              ></EyeOff>
            </button>
          ) : (
            <button className="">
              <Eye
                className="text-gray-500 size-8 hover:text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              ></Eye>
            </button>
          )}
        </label>

        <button
          disabled={buttonDisabled}
          className={`p-3 border border-gray-300 rounded-2xl m-2 mb-4 text-black text-xl focus:outline-none focus:border-gray-600 cursor-pointer ${buttonDisabled ? "bg-gray-100" : "bg-[#0955ec] border-none"}`}
          onClick={onSignup}
        >
          Signup
        </button>
        <p className="mt-6 mb-2 text-center">Already a member?</p>
        <button
          className={`mt-1 p-3 border border-blue-500 rounded-2xl m-2 mb-4 text-blue-500 text-xl focus:outline-none hover:bg-gray-800 cursor-pointer`}
        >
          <Link href="/login">Login</Link>
        </button>
        <p className="text-sm text-center mt-4"> © Copyrights 2026</p>
      </div>
    </div>
  );
}
