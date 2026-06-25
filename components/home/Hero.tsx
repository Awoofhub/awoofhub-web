"use client";

import heroImg from "@/public/heroImage.svg";
import mobileHero from "@/public/mobileHero.svg";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className=" bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-6 md:px-6 lg:px-12 lg:py-14 flex flex-col text-center md:text-start md:flex-row items-center gap-6 lg:gap-12 ">
        {/* Left Content Side */}
        <div className="w-full md:w-1/2 space-y-3 md:space-y-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-xl shadow-md">
            <span className="w-2 h-2 xs:w-3 xs:h-3 bg-primary rounded-full animate-pulse"></span>
            <span className="text-xs lg:text-sm font-baloo font-semibold text-primary uppercase ">
              #1 DEALS MARKETPLACE IN NIGERIA
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-3xl lg:text-5xl mt-2 lg:mt-4 font-bold text-black leading-tight">
            Discover the <span className="text-primary">best deals</span> in
            your city!
          </h1>

          {/* Description */}
          <p className="text-sm mx-auto md:mx-0 lg:text-lg font-medium text-muted max-w-lg">
            We bring together verified discounts, freebies and cashback offers
            from your most-loved merchants, all in one place. Save money on
            things you love.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 lg:gap-4 mt-4">
            <Link
              href="/offers/create"
              className="w-full md:w-35 lg:w-45 p-2 border border-orange-600 cursor-pointer font-baloo text-orange-600 text-base lg:text-lg font-medium rounded-sm hover:bg-orange-50 transition-colors text-center"
            >
              Post an Awoof
            </Link>

            <Link
              href="/offers"
              className="w-full md:w-35 lg:w-45 p-2 bg-orange-600 text-white cursor-pointer font-medium font-baloo rounded-sm text-base lg:text-lg hover:bg-orange-700 transition-shadow shadow-orange-200 text-center"
            >
              Browse Offers
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-6 lg:gap-8 mt-6 lg:mt-10">
            <div>
              <p className="text-xl lg:text-2xl font-baloo font-bold text-[#313131]">
                900+
              </p>
              <p className="text-[12px] lg:text-sm text-[#61646B]">
                Verified deals
              </p>
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-baloo font-bold text-[#313131]">
                5000+
              </p>
              <p className="text-[12px] lg:text-sm text-[#61646B]">
                Active users
              </p>
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-baloo font-bold text-[#313131]">
                350+
              </p>
              <p className="text-[12px] lg:text-sm text-[#61646B]">
                Trusted Merchants
              </p>
            </div>
          </div>
        </div>

        {/* Right image */}  {/* desktop hero image */}
        <div className="hidden md:flex w-1/2  justify-center">
          <Image
            src={heroImg}
            alt="Hero illustration"
            width={560}
            height={500}
            priority
            className="w-full max-w-[650px] h-auto"
          />
        </div>

        {/* mobile hero image */}
        <div className="w-full flex md:hidden justify-center">
          <Image
            src={mobileHero}
            alt="Hero illustration"
            width={360}
            height={240}
            priority
            className="w-full max-w-[500px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
