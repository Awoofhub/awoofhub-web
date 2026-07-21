import Image from "next/image";

const activityConfig = {
    user_suspended: { bg: "bg-[#CD0F0F1A] text-red-600", src: "/UserSuspendedIcon.svg" },
    offer_pending: { bg: "bg-[#C29A06] text-amber-600", src: "/OfferPendingIcon.svg" },
    offer_alert: { bg: "bg-[#9747FF] text-orange-600", src: "/OfferAlertIcon.svg" },
    offer_approved: { bg: "bg-[#00A95D] text-emerald-600", src: "/OfferApprovedIcon.svg" },
    offer_rejected: { bg: "bg-[#E70606] text-rose-600", src: "/OfferRejectedIcon.svg" },
    offer_suspended: { bg: "bg-[#FFC000] text-gray-600", src: "/OfferSuspendedIcon.svg" },
    offer_expiring: { bg: "bg-[#59585880] text-yellow-600", src: "/OfferExpiringIcon.svg" },
    offer_expired: { bg: "bg-[#59585880] text-zinc-500", src: "/OfferExpiredIcon.svg" },
};

export type ActivityType = keyof typeof activityConfig;

export function ActivityIcon({ type }: { type: ActivityType }) {
    const config = activityConfig[type] || { bg: "bg-gray-50 text-gray-600", src: "/OfferAlertIcon.svg" };
  
    return (
        <div className={`flex items-center justify-center w-5 h-5 xs:w-7 xs:h-7 lg:w-10 lg:h-10 rounded-full ${config.bg}`}>
            <Image 
                src={config.src} 
                alt="" 
                priority 
                width={20} 
                height={20} 
                className="w-3 h-3 xs:w-4 xs:h-4 lg:w-6 lg:h-6"
            />
        </div>
    );
}