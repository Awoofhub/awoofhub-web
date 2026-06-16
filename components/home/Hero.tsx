"use client";

import heroImg from "@/public/heroImg.svg";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className=" bg-white">
      <div className="max-w-[1440px] mx-auto px-6 py-6 md:px-12 lg:py-14 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content Side */}
        <div className="w-full md:w-1/2 space-y-3 md:space-y-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-2 py-1 xs:px-3 xs:py-2 bg-gray-50 border border-gray-100 rounded-full shadow-sm">
            <span className="w-2 h-2 xs:w-3 xs:h-3 bg-primary rounded-full animate-pulse"></span>
            <span className="text-xs lg:text-sm font-baloo font-semibold text-primary uppercase ">
              #1 DEALS MARKETPLACE IN NIGERIA
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl mt-4 font-semibold text-black leading-tight">
            Discover the <span className="text-primary">best deals</span> in
            your city!
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg font-medium text-muted max-w-lg">
            Find exclusive discounts on food, services, and entertainment near
            you. Save money on things you love.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Link 
              href="/offers/create" 
              className="w-full md:w-1/3 lg:w-1/4 p-2 border border-orange-600 cursor-pointer font-baloo text-orange-600 text-base font-medium rounded-sm hover:bg-orange-50 transition-colors text-center"
            >
              Post an Awoof
            </Link>
            
            <Link 
              href="/offers" 
              className="w-full md:w-1/3 lg:w-1/4 p-2 bg-orange-600 text-white cursor-pointer font-medium font-baloo rounded-sm text-base hover:bg-orange-700 transition-shadow shadow-orange-200 text-center"
            >
              Browse Offers
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            <div>
              <p className="text-2xl font-baloo font-semibold text-[#313131]">900+</p>
              <p className="text-xs lg:text-sm text-[#61646B]">Verified deals</p>
            </div>
            <div>
              <p className="text-2xl font-baloo font-semibold text-[#313131]">5000+</p>
              <p className="text-xs lg:text-sm text-[#61646B]">Active users</p>
            </div>
            <div>
              <p className="text-2xl font-baloo font-semibold text-[#313131]">350+</p>
              <p className="text-xs lg:text-sm text-[#61646B]">Trusted Contributors</p>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={heroImg}
            alt="Hero illustration"
            width={560}
            height={500}
            priority
            className="w-full max-w-[650px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}