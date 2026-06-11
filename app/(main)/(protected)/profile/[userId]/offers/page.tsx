"use client"
import { OfferError } from "@/components/offers/OfferError";
import OfferList from "@/components/offers/OfferList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { useOffersByUser } from "@/features/offers/useoffersByUser";
import { Spinner } from "@chakra-ui/react";
import { use, useEffect, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useInView } from "react-intersection-observer";


interface Props {
    params: Promise<{ userId: string }>;
}

export default function ProfilePage({ params }: Props) {
    const { userId } = use(params);

    const [ref, inView] = useInView();

    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useOffersByUser({
        userId, search: "", category: "", minRating: 0, createdFrom: "", createdTo: "", limit: 8
    });

    const allOffers = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? [];
    }, [data]);


    // Trigger next page load when in view
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);


    // Early returns make JSX cleaner
    if (isFetching && allOffers.length === 0) {
        return (
            <section className="px-6 py-2 md:px-12">
                <OfferListSkeleton number={4} />
            </section>
        );
    }

    if (isError) {
        return <div>{error?.message}</div>
    }

    if (!allOffers.length) {
        return (
            <section className="pt-14 px-6">
                <p className="text-center text-gray-500">No offers Posted.</p>
            </section>
        );
    }


    return (
        <ErrorBoundary fallback={<OfferError />}>
            <section className="px-6 py-2 md:px-12 mb-15 lg:mb-0">
                <OfferList offers={allOffers} />
                <div ref={ref} className="h-10 flex items-center justify-center mt-6">
                    {isFetchingNextPage && (
                        <Spinner className="mt-5 w-17 h-17 text-primary" data-testid="loading" />
                    )}
                    {!hasNextPage && allOffers.length > 0 && <p className="text-center text-[14px] sm:text-[16px]">No more offers</p>}
                </div>
            </section>
        </ErrorBoundary>
    );
}