'use client'
import { Category } from "@/types/category";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
  categories: Category[];
  activeId: string;
}

export default function CategoryLinks({ categories, activeId }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeId || !scrollRef.current) return;
    const activeLink = scrollRef.current.querySelector(
      `[data-id="${activeId}"]`
    ) as HTMLElement;
    if (!activeLink) return;
    requestAnimationFrame(() => {
      activeLink.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
  }, [activeId]);

  return (
    <div className="sticky bg-white top-16 lg:top-20 z-40 mb-10 border-b border-gray-200 py-3 px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:gap-10 md:items-center md:justify-between">
        <h2 className="text-primary font-bold text-xl py-2 mb-2 md:mb-0">
          Categories
        </h2>
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`#${cat.id}`}
              data-id={cat.id}
              className={`px-5 py-1.5 font-semibold rounded-full text-sm whitespace-nowrap
                transition-all duration-200 ease-in-out
                ${activeId === cat.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}