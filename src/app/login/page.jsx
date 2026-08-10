"use client"; // this makes the page/component which is on server side to the client side so that we can export client data
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Loader, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const buttonDisabled = !user.email.trim() || !user.password.trim();

  const onLogin = async () => {
    let loadingToast;
    try {
      setLoading(true);
      loadingToast = toast.loading(`Signing In`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      //set the route
      await axios.post("/api/users/login", user);
      toast.dismiss(loadingToast);
      toast.success("Logged in successfuly", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 1000,
      });
      // push to profile page
      router.push("/profile");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Login failed. Check login credentials", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 6000,
      });
      console.log("Login Failed: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-primary-bg max-w-screen max-h-screen ">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="flex flex-col rounded-xl m-4 p-6 bg-card-bg w-120 h-190 max-w-screen max-h-screen shadow-[0_0_2rem_#15181e]">
        <div className="flex justify-center items-center m-4 mb-8">
          <Zap className="bg-primary-btn rounded-full size-10 text-black"></Zap>
        </div>
        <h1 className="text-4xl mb-6 text-center">Log in to your account</h1>
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
          className="flex items-center justify-between gap-2 border border-gray-600 rounded-lg m-2 mb-4 focus:outline-none p-2"
        >
          <input
            className="flex-1 text-xl focus:outline-none focus:border-gray-600"
            type={showPassword ? "text" : "password"}
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          {showPassword ? (
            <button type="button" className="flex items-center justify-center">
              <EyeOff
                className="text-gray-500 size-6 hover:text-primary-btn"
                onClick={() => setShowPassword(!showPassword)}
              ></EyeOff>
            </button>
          ) : (
            <button type="button" className="flex items-center justify-center">
              <Eye
                className="text-gray-500 size-6 hover:text-primary-btn"
                onClick={() => setShowPassword(!showPassword)}
              ></Eye>
            </button>
          )}
        </label>
        <div className="flex flex-col">
          <button
            disabled={buttonDisabled}
            className={`flex justify-center items-center p-3 rounded-2xl m-2 mb-4 focus:outline-none focus:border-gray-600 text-black 
              ${buttonDisabled ? "bg-disabled-btn text-disabled-btn-text hover:cursor-not-allowed" : "bg-primary-btn hover:shadow-[0_0_0.5rem_#f5f5f5] text-primary-btn-text hover:cursor-pointer"}`}
            onClick={onLogin}
          >
            {loading ? (
              <Loader className="animate-spin mx-auto text-primary-btn-text"></Loader>
            ) : (
              "Login"
            )}
          </button>
          <button
            className={`p-3 hover:rounded-2xl hover:bg-gray-800 mb-4 focus:outline-none text-primary cursor-pointer`}
          >
            <Link href={"/forgot-password"}>Forgot Password?</Link>
          </button>
          <p className="mt-6 mb-2 text-center">Not a member?</p>
          <button
            className={`p-3 border-secondary bg-primary-btn hover:shadow-[0_0_0.5rem_#f5f5f5] rounded-2xl m-2 mt-1 mb-4 focus:outline-none text-primary-btn-text cursor-pointer `}
          >
            <Link href="/signup">Create new account</Link>
          </button>
        </div>
        <p className="text-sm text-center mt-4"> © Copyrights 2026</p>
      </div>
    </div>
  );
}
