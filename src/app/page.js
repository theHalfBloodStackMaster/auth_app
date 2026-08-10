"use client";
import Image from "next/image";
import Link from "next/link";

import { ChevronRight, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col bg-primary-bg scroll-smooth min-h-screen">
      <navbar className="flex justify-between self-center border rounded-2xl border-card-border w-100 h-12 p-2 m-4 max-w-screen">
        <logo>
          <Link href="/">
            <Zap className=" size-8 hover:cursor-default" />
          </Link>
        </logo>
        <button className=" rounded-lg p-1 hover:cursor-pointer">
          <Link href="/signup">Signup</Link>
        </button>
        <button className="rounded-lg p-1 hover:cursor-pointer ">
          <Link href="/login">Login</Link>
        </button>
      </navbar>
      <main-content className="flex flex-col justify-center items-center bg-primary-bg border-none shadow-lg p-10 mt-4 rounded-2xl ring-card-ring max-w-screen h-screen">
        <h1 className="text-2xl md:text-6xl sm:4xl text-center mb-8 text-primary">
          Revolutionize your authentication experience with Monochrome
        </h1>
        <p className="capitalize text-center text-sm sm:text-lg md:xl  text-muted">
          Developer-centric Security:Effortless Intigration, no redirects, your
          design rules.
        </p>
        <div className="flex w-full justify-center items-center gap-10 m-10 p-3">
          <button className=" bg-primary-btn hover:bg-primary-btn-hover text-primary-btn-text rounded-lg p-3 hover:cursor-pointer shadow-[0_0_1rem_#f5f5f5] text-lg ">
            <Link href="/signup">
              Get Started
              <ChevronRight className="inline size-6 self-center"></ChevronRight>
            </Link>
          </button>
          {/* <button className="bg-secondary-btn hover:bg-secondary-btn-hover text-secondary-btn-text rounded-lg p-3 mr-4 hover:cursor-pointer ">
            <Link href="/login">Login</Link>
          </button> */}
        </div>
      </main-content>

      <footer>© Copyright 2026</footer>
    </div>
  );
}
