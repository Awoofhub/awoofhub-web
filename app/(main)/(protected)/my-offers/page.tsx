"use client";
import { useMyOffers } from "@/features/offers/useMyOffers";
import { useMyOffersTabsCount } from "@/features/offers/useMyOffersTabsCount";
import { useMemo, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import MyOffersTabs from "@/components/myoffers/MyOffersTabs";
import MyOfferListItem from "@/components/myoffers/MyOfferListItem";
import MyOfferModal from "@/components/myoffers/MyOfferModal";
import { Offer } from "@/types/offer";
import { Spinner } from "@chakra-ui/react";
import { getDisplayStatus } from "@/utils/offerStatus";
import Image from "next/image";
import { Plus } from "lucide-react";
import MyOfferListItemSkeleton from "@/components/myoffers/MyOfferListItemSkeleton";

export default function MyOffersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "all";

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [ref, inView] = useInView();

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useMyOffers({
      search: "",
      category: "",
      minRating: 0,
      createdFrom: "",
      createdTo: "",
      limit: 20,
      tab: activeTab,
    });

  const { data: counts } = useMyOffersTabsCount();

  const STATUS_ORDER: Record<string, number> = {
    active: 0,
    pending: 1,
    rejected: 2,
    expired: 3,
    suspended: 4,
  };

  const offers = useMemo(() => {
    const flat = data?.pages.flatMap((page) => page.data) ?? [];

    if (activeTab !== "all") return flat;

    return [...flat].sort((a, b) => {
      const statusA = getDisplayStatus(a);
      const statusB = getDisplayStatus(b);
      return STATUS_ORDER[statusA] - STATUS_ORDER[statusB];
    });
  }, [data, activeTab]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleTabChange = (tab: string) => {
    router.push(`/my-offers?tab=${tab}`);
  };

  return (
    <div className="px-6 md:px-12 max-w-[1440px] mx-auto py-6 mb-10 lg:mb-6">
      <h1 className="text-2xl font-semibold text-black">My Posts</h1>
      <p className="text-muted text-sm lg:text-base mb-4">
        Track the status of every deal you've shared.
      </p>

      <div className="mb-6">
        <MyOffersTabs
          activeTab={activeTab}
          onChange={handleTabChange}
          counts={counts}
        />
      </div>
      {isFetching && offers.length === 0 && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <MyOfferListItemSkeleton key={i} />
          ))}
        </div>
      )}

      {!isFetching && offers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Image
            className="mb-4"
            src="/emptyMyPost.svg"
            alt="empty post"
            width={40}
            height={40}
          />
          <p className="font-semibold text-black font-baloo text-lg mb-1">
            Your next great deal starts here
          </p>
          <p className="text-muted max-w-125 text-sm mb-4">
            You haven't posted any deals yet. Share an offer, earn trust, and
            help others discover amazing savings!
          </p>
          <Link
            href="/offers/create"
            className="bg-primary text-white px-6 py-2 rounded-md text-sm font-baloo font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Post an Awoof
          </Link>
        </div>
      )}

      {!isFetching && offers.length > 0 && (
        <div className="space-y-3">
          {offers.map((offer) => (
            <MyOfferListItem
              key={offer.id}
              offer={offer}
              onClick={() => setSelectedOffer(offer)}
            />
          ))}
        </div>
      )}

      <div ref={ref} className="h-10 flex items-center justify-center mt-4">
        {isFetchingNextPage && <Spinner className="text-primary" size="md" />}
      </div>

      <MyOfferModal
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
      />
    </div>
  );
}
