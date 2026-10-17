"use client";

import BoostOfferCard from "@/components/my-offers/boost/BoostOfferCard";
import BoostPlanList from "@/components/my-offers/boost/BoostPlanList";
import BoostPlanListSkeleton from "@/components/my-offers/boost/BoostPlanListSkeleton";
import { Button } from "@/components/button/Button";
import { useOffer } from "@/features/offers/useOffer";
import { getDisplayStatus } from "@/utils/offerStatus";
import { SlLock } from "react-icons/sl";
import { use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default function BoostPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { data: offer, isLoading } = useOffer({ id });

  if (isLoading) {
    return <BoostPlanListSkeleton />;
  }

  if (!offer) {
    return (
      <section className="pt-14 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
        <p className="text-center text-gray-500">Offer not found.</p>
      </section>
    );
  }

  const status = getDisplayStatus(offer);

  if (status !== "active") {
    return (
      <section className="p-6 xs:p-10 max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <Image
          src="/notFound.png"
          alt=""
          width={120}
          height={120}
          className="w-35 h-35 xs:w-40 xs:h-40 lg:w-50 lg:h-50 mb-3"
        />

        <h1 className="font-bold text-lg xs:text-xl lg:text-2xl text-black">
          You can only boost an active offer
        </h1>

        <p className="text-muted text-xs xs:text-base lg:text-lg max-w-xl leading-tight mt-2 mb-6">
          This offer is not active yet. Once it goes live, you'll be able to
          boost it and get more visibility for your product.
        </p>

        <div className="w-full max-w-md">
          <Button
            onClick={() => router.push("/my-offers")}
            className="!w-full !mx-0 text-sm"
          >
            Go to My Offers
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="py-4 xs:py-6 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto mb-24 lg:mb-0 flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-xl md:text-2xl text-black">
          Promote your Awoof
        </h1>
        <p className="text-muted text-sm xs:text-base md:text-lg">
          Choose your goal and a promotion package that fits your needs
        </p>
      </div>

      <BoostOfferCard offer={offer} />

      <hr className="text-muted/30" />

      <BoostPlanList offerId={offer.id} />

      <div className="bg-[#FFD5C34D] text-gray-900 rounded-xl flex flex-col items-center text-center p-4 xs:p-6">
        <div className="max-w-150">
          <SlLock size={24} className="text-primary mx-auto mb-2" />
          <h1 className="font-semibold">Your payment is secured</h1>
          <p className="text-xs leading-relaxed">
            AwoofHub uses industry standard encryption to keep your information
            save.
          </p>
          <p className="text-xs leading-relaxed">
            After you click ‘PAY’ you will be redirected to Paystack payment
            platform to complete this process. Your bank may ask you to complete
            an additional verification to authorize this transaction. Follow the
            instructions provided by your bank to complete your payment
          </p>
        </div>
      </div>
    </div>
  );
}