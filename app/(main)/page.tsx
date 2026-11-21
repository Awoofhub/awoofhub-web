"use client";
import Footer from "@/components/footer/Footer";
import ExpiringOffers from "@/components/home/ExpiringOffers";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import Hero from "@/components/home/Hero";
import TrendingOffers from "@/components/home/TrendingOffers";
import CommunityModal from "@/components/modals/community/CommunityModal";
import { useSession } from "@/features/storage/useSession";
import Image from "next/image";

export default function Home() {

  const [isModalOpen, setIsModalOpen, isLoaded] = useSession<boolean>("communityModalSeen");

  return (
    <>
      <Hero />
      <ExpiringOffers />
      <TrendingOffers />
      <div className="max-w-[1600px] mx-auto">
        <Image
          src="/Banner1.svg"
          alt="the marketplace where deals find you"
          width={800}
          height={300}
          className="w-full hidden md:block"
        />
        <Image
          src="/mobileBannerA.jpeg"
          alt="the marketplace where deals find you"
          width={800}
          height={500}
          className="w-full md:hidden"
        />
      </div>
      <FeaturedOffers />
      <Footer />

      {isLoaded && (
        <CommunityModal
          isOpen={isModalOpen ?? true}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
