"use client";
import Footer from "@/components/footer/Footer";
import ExpiringOffers from "@/components/home/ExpiringOffers";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import Hero from "@/components/home/Hero";
import TrendingOffers from "@/components/home/TrendingOffers";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <ExpiringOffers/>
      <TrendingOffers/>
      <div className="max-w-[1600px] mx-auto">
        <Image
          src="/Banner1.svg"
          alt="Don't miss deals again"
          width={1600}
          height={300}
          className="w-full"
        />
      </div>
      <FeaturedOffers />
      <Footer />
  </>
  );
}
