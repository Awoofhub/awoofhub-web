"use client";
import { useCategory } from "@/features/category/useCategory";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import CategorizedOffers from "./CategorizedOffers";
import CategoryLinks from "./CategoryLinks";
import Image from "next/image";

export default function FeaturedOffers() {
  const { data, isFetching, isFetched } = useCategory();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!data || data.length === 0) return;

    const stickyOffset = window.innerWidth < 768 ? 112 : 128;
    const observers: IntersectionObserver[] = [];

    data.forEach((cat) => {
      const heading = document.getElementById(`cat-heading-${cat.id}`);
      if (!heading) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(cat.id);
          }
        },
        {
          rootMargin: `-${stickyOffset}px 0px -50% 0px`,
          threshold: 0,
        },
      );

      observer.observe(heading);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [data]);

  if (isFetching) return <Loading />;

  if (isFetched && (!data || data.length === 0)) {
    return <p className="text-center pb-10 text-gray-500">No offers available.</p>;
  }

  if (!data) return null;

  const firstHalf = data.slice(0, 3);
  const secondHalf = data.slice(3);

  return (
    <div className="bg-gray-50 pt-6 md:pt-12">
      <CategoryLinks categories={data} activeId={activeId} />

      {/* First 3 categories */}
      <div className="max-w-[1440px] mx-auto">
        <CategorizedOffers categories={firstHalf} />
      </div>

      {/* Banner*/}
      <div className="w-full mb-16">
        <div className="max-w-[1600px] mx-auto">
          <Image
            src="/Banner2.svg"
            alt="Don't miss deals again"
            width={1600}
            height={300}
            className="w-full"
          />
        </div>
      </div>

      {/* Last 3 categories */}
      <div className="max-w-[1440px] mx-auto">
        <CategorizedOffers categories={secondHalf} />
      </div>
    </div>
  );
}