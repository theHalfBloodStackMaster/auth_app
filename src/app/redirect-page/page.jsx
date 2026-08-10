"use client";

import Link from "next/link";
import { CircleArrowRight } from "lucide-react";

export default function RedirectPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-primary-bg">
      <div className="flex flex-col rounded-2xl m-4 p-6 bg-card-bg max-w-screen max-h-screen shadow-[0_0_2rem_#15181e]">
        <div className="flex items-center justify-center gap-2 whitespace-nowrap text-2xl">
          <span>Go to</span>

          <Link href="/login">Login</Link>

          <span>Page</span>

          <Link href="/login" aria-label="Go to Login page">
            <CircleArrowRight
              className="
                size-10
                text-secondary-btn-text
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
