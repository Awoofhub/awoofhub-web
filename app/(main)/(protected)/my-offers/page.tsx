"use client";
import MyOfferListItem from "@/components/my-offers/MyOfferListItem";
import MyOffersTabs from "@/components/my-offers/MyOffersTabs";
import { useFilter } from "@/features/offers/useFilter";
import { MyOffersTabsCount } from "@/types/offer";
import { Spinner } from "@chakra-ui/react";
import { Suspense, use } from "react";

type FilterParams = {
  tab?: string,
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

function MyOffersPage({ searchParams }: FilterProps) {
  const params = use(searchParams);
  const { tab } = params;

  const updateTab = useFilter("/my-offers");

  const Tabs: { value: keyof MyOffersTabsCount | undefined; label: string }[] = [
    { value: undefined, label: "All" },
    { value: "approved", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
    { value: "suspended", label: "Suspended" },
    { value: "expired", label: "Expired" },
  ];

  return (
    <div className="bg-white">
      <div className="px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto py-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-black mb-2">
          My Posts
        </h1>
        <p className="text-muted text-xs md:text-sm lg:text-base mb-4">
          Track the status of every deal you've shared.
        </p>

        <div className="mb-6">
          <MyOffersTabs
            activeTab={tab}
            onChange={(value) => updateTab("tab", value)}
            tabs={Tabs}
          />
        </div>

        <MyOfferListItem tab={tab} />
        
      </div>
    </div>
  );
}


export default function Filter(props: FilterProps) {
  return (
    <Suspense
      fallback={
        <section className="flex justify-center pt-14">
          <Spinner size="xl" />
        </section>
      }
    >
        <MyOffersPage searchParams={props.searchParams} />
    </Suspense>
  );
}
