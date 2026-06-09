'use client'
import { useOffersByCategory } from "@/features/offers/useOffersByCategory";
import { Category } from "@/types/category";
import Link from 'next/link';
import { ErrorBoundary } from "react-error-boundary";
import { FiArrowRight } from "react-icons/fi";
import { OfferError } from "../offers/OfferError";
import OfferList from "../offers/OfferList";
import OfferListSkeleton from "../offers/OfferListSkeleton";

interface Props {
    category: Category;
}

export default function CategorySection({ category }: Props) {

    const { data, isFetching, isFetched } = useOffersByCategory({
        categoryId: category.id, page: 1, limit: 4
    });

    return (
        <section id={category.id}  className="pb-16 px-6 md:px-12">
            <div className="flex justify-between items-baseline mb-3 sm:mb-6">
                <h3 id={`cat-heading-${category.id}`} className="text-xl sm:text-2xl font-bold">
                    {category.name}
                </h3>

                <Link
                    href={`/offers?category=${category.slug}`}
                    className="group inline-flex items-center gap-2 text-orange-600 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    aria-label={`View all offers in ${category.name}`}
                >
                    <span className="text-xs sm:text-sm font-bold">View all</span>
                    <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
            </div>

            <ErrorBoundary fallback={<OfferError />}>
                {isFetching && <OfferListSkeleton number={4} />}
                {!isFetching && data.length === 0 && (
                    <p className="text-gray-500">No offers available.</p>
                )}
                {isFetched && data.length > 0 && <OfferList offers={data} />}
            </ErrorBoundary>

        </section>

    );
}

