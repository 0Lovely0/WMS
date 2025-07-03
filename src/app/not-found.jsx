"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 bg-neutral-800 min-h-screen px-4 sm:px-6 md:px-8">
        <Image
          src="/4044.svg"
          alt="404 image"
          width={700}
          height={200}
          className="w-[280px] sm:w-[400px] md:w-[600px] lg:w-[700px] h-auto"
        />

        <Link href="/">
          <div className="flex justify-center items-center w-[120px] h-[40px] sm:w-[140px] sm:h-[45px] md:w-[160px] md:h-[50px] border border-neutral-500 rounded-lg bg-green-800 hover:bg-green-900 font-light hover:font-bold ease-in-out mt-4">
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base">
              Go to Home
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
