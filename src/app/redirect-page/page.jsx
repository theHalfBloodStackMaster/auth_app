"use client";

import Link from "next/link";
import { CircleArrowRight } from "lucide-react";

export default function RedirectPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="flex w-full max-w-4xl items-center justify-center rounded-xl bg-gray-900 p-6 sm:p-8 md:p-10">
        <div className="flex items-center justify-center gap-2 whitespace-nowrap text-2xl">
          <span>Go to</span>

          <Link href="/login" className="hover:text-blue-500">
            Login
          </Link>

          <span>Page</span>

          <Link href="/login" aria-label="Go to Login page">
            <CircleArrowRight
              className="
                size-10
                text-blue-600
                hover:cursor-pointer
                hover:animate-bounce-forward
              "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
