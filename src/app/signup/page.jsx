"use client"; // this makes the page/component which is on server side to the client side so that we can export client data
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Loader, Zap } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    let loadingToast;
    try {
      setLoading(true);
      loadingToast = toast.loading("Signing in");
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
      toast.dismiss(loadingToast);
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
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const buttonDisabled =
    !user.username.trim() || !user.email.trim() || !user.password.trim();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-primary-bg">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div className="flex flex-col rounded-xl m-4 p-6 bg-card-bg w-120 h-190 max-w-screen max-h-screen shadow-[0_0_2rem_#15181e]">
        <div className="flex justify-center items-center m-4 mb-8">
          <Zap className="bg-primary-btn rounded-full size-10 text-black"></Zap>
        </div>
        <h1 className="text-4xl mb-6 text-center">Signup</h1>
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
                className="text-gray-500 size-6 hover:text-primary-btn"
                onClick={() => setShowPassword(!showPassword)}
              ></EyeOff>
            </button>
          ) : (
            <button className="">
              <Eye
                className="text-gray-500 size-6 hover:text-primary-btn"
                onClick={() => setShowPassword(!showPassword)}
              ></Eye>
            </button>
          )}
        </label>

        <button
          disabled={buttonDisabled}
          className={`flex items-center justify-center p-3 rounded-2xl m-2 mb-4 text-xl focus:outline-none focus:border-gray-600 ${buttonDisabled ? "bg-disabled-btn hover:cursor-not-allowed text-disabled-btn-text" : "bg-primary-btn hover:shadow-[0_0_0.5rem_#f5f5f5] hover:cursor-pointer text-primary-btn-text"}`}
          onClick={onSignup}
        >
          {loading ? (
            <Loader className="animate-spin mx-auto text-primary-btn-text"></Loader>
          ) : (
            "Signup"
          )}
        </button>
        <p className="mt-6 mb-2 text-center">Already a member?</p>
        <button
          className={`mt-1 p-3 rounded-2xl m-2 mb-4 bg-primary-btn text-primary-btn-text text-xl focus:outline-none hover:shadow-[0_0_0.5rem_#f5f5f5] cursor-pointer`}
        >
          <Link href="/login">Login</Link>
        </button>
        <p className="text-sm text-center mt-4"> © Copyrights 2026</p>
      </div>
    </div>
  );
}
