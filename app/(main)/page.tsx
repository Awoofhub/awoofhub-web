'use client'
import BlockBusiness from "@/components/blockRoles/BlockBusiness";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/home/Banner";
import ExploreOffers from "@/components/home/ExploreOffers";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import Hero from "@/components/home/Hero";

export default function Home() {

  return (
    <BlockBusiness>
      <Hero />
      <ExploreOffers />
      <Banner />
      <FeaturedOffers />
      <Footer />
    </BlockBusiness>

  );
};