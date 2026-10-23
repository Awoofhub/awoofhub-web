"use client";
import ReportModal from "@/components/modals/report/ReportModal";
import { User } from "@/types/user";
import { capitalizeFirstLetter } from "@/utils/truncate";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import AlertButton from "../alert/Alert";
import ChatButton from "../chat/ChatButton";
import EditProfileModal from "../modals/user/EditProfileModal";

interface Props {
  isOwnProfile: boolean;
  profile: User;
  currentUser?: User;
}

export default function ProfileCard({ isOwnProfile, profile, currentUser }: Props) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);


  const isViewerActivePro = currentUser?.subscriptionState === "active" && currentUser?.subscriptionPlan === "pro";

  const isOfficial = profile.role === "staff";

  const canMessage = isViewerActivePro || isOfficial;

  const isProfileActive = profile.subscriptionState === "active" && (profile.subscriptionPlan === "growth" || profile.subscriptionPlan === "pro");

  const hasActiveSub = profile.subscriptionState === "active";

  return (
    <>
      <div className="w-full xs:w-1/3 lg:w-1/4 shrink-0 bg-white rounded-2xl px-4 xs:px-2 xl:px-4 py-6 xl:py-8 shadow-sm border border-gray-100 relative">
        <div className="flex flex-col mb-4">
          <div className="flex justify-between">
            <div className="w-25 h-25 xs:w-20 xs:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 xl:w-30 xl:h-30 border-2 border-[#FF4D0D] rounded-full overflow-hidden mb-3">
              {profile.profileImageUrl ? (
                <Image
                  width={200}
                  height={200}
                  unoptimized
                  src={profile.profileImageUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-[#F7C8D5] text-[#B85B80] text-3xl font-semibold flex items-center justify-center w-full h-full">
                  {capitalizeFirstLetter(profile.name)}
                </div>
              )}
            </div>

            {/* Profile badge */}
            <div >
              {isOfficial ? (
                <span className="flex items-center gap-1 bg-linear-to-b from-[#896D02] to-[#EFBF04] text-white text-[10px] lg:text-xs font-semibold py-1 px-2 rounded-full">
                  <RiVerifiedBadgeFill size={13} />
                  Official
                </span>
              ) : isProfileActive ? (
                <Link
                  href="/premium-user"
                  className="flex items-center gap-1 bg-[#164CC3] text-white text-[10px] lg:text-xs font-semibold px-2 py-1 rounded-full hover:underline"
                >
                  <RiVerifiedBadgeFill size={13} />
                  Premium
                </Link>
              ) : isOwnProfile && !hasActiveSub ? (
                <Link
                  href="/premium-user"
                  className="flex items-center gap-1 bg-[#DEE8FB] text-[#164CC3] text-[10px] lg:text-xs font-bold px-2 py-1 rounded-full hover:underline"
                >
                  <RiVerifiedBadgeFill size={13} />
                  Get Premium
                </Link>
              ) : (
                <span className="flex items-center gap-1 bg-[#FFF0EC] text-primary text-[10px] lg:text-xs font-semibold px-2 py-1 rounded-full">
                  <FaRegUser size={11} /> Awoofer
                </span>
              )}
            </div>
          </div>
          <h1 className="text-xl  md:text-lg xl:text-2xl font-semibold text-black">
            {profile.name}
          </h1>

          <div className="flex items-start gap-2 text-black text-base xs:text-sm lg:text-base font-medium mt-1 flex-wrap">
            <span>@{profile.username}</span>
            {profile.address && (
              <span className="flex items-center gap-1">
                <GoDotFill size={14} />
                <span>{profile.address}</span>
              </span>
            )}
          </div>

          {profile.bio ? (
            <p className="text-muted text-base xs:text-sm lg:text-base mt-3 text-start">
              {profile.bio}
            </p>
          ) : (
            <p className="text-muted text-base xs:text-sm lg:text-base mt-3 py-2">
              No bio added.
            </p>
          )}

          {!isOfficial && (
            <p className="text-primary text-sm xs:text-sm font-medium mt-3">
              Awoofer since {format(new Date(profile.createdAt), "MMMM yyyy")}
            </p>
          )}
        </div>

        {!isOwnProfile && (
          canMessage ? (

            <ChatButton targetUserId={profile.id}>
              <span className="w-full mt-6 mb-4 text-center border border-primary text-primary py-2 rounded-md text-sm lg:text-base font-medium font-baloo hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                <LuMessageSquareText className="w-5 h-5" />
                Message
              </span>
            </ChatButton>
          ) : (
            <div className="w-full mt-6 mb-4 text-center border border-gray-300 bg-[#D9D9D980] text-muted py-2 rounded-md text-sm lg:text-base font-medium font-baloo flex items-center justify-center gap-1 cursor-not-allowed">
              <LuMessageSquareText className="w-5 h-5" />
              Upgrade to Message
            </div>
          )
        )}

        < div className=" xs:py-4 space-y-2 xs:space-y-3">
          <div className="flex justify-between px-4 py-6 border border-muted/10 shadow-lg rounded-md items-center">
            <span className=" text-muted text-sm xs:text-xs lg:text-sm font-semibold">
              DEALS POSTED
            </span>
            <span className="font-bold text-lg text-black">
              {profile.numOfDealPosted ?? 0}
            </span>
          </div>
          <div className="flex justify-between px-4 py-6 border border-muted/10 shadow-lg rounded-md items-center">
            <span className="text-muted text-sm xs:text-xs lg:text-sm font-semibold">
              OFFER CLICKS
            </span>
            <span className="font-bold text-lg text-black">
              {profile.offerClicks ?? 0}
            </span>
          </div>
        </div>

        {isOwnProfile && (
          <div className="flex flex-col gap-3 my-6">
            <button
              onClick={() => setIsEditOpen(true)}
              className="w-full font-baloo text-center border cursor-pointer border-primary text-primary py-3 rounded-md text-base xs:text-sm lg:text-base font-semibold hover:bg-orange-50 transition-colors"
            >
              Edit Profile
            </button>
            <Link
              href="/offers/create"
              className="w-full font-baloo  text-center bg-primary text-white py-3 rounded-md text-base xs:text-sm lg:text-base font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-5 h-5" />
              Post Awoof
            </Link>
          </div>
        )}

        {!isOwnProfile && (
          <div className="bg-[#FFF6F2] border shadow-md border-[#F7D9CC] p-3 xs:p-2 xl:p-3 rounded-lg my-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-base font-medium font-baloo text-black">
                  Set alerts
                </p>
                <p className="text-xs xs:text-[10px] xl:text-xs text-muted">
                  Get notified when {profile.name.split(" ")[0]} posts.
                </p>
              </div>
              <AlertButton contributorId={profile.id} />
            </div>
          </div>
        )}

        {!isOwnProfile && (
          <div className="flex text-center items-center justify-center">
            <button
              onClick={() => {
                setIsReportOpen(true);
              }}
              className="cursor-pointer text-[#E70606] font-semibold text-xs lg:text-sm underline"
            >
              Report this user
            </button>
          </div>
        )}
      </div >

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="user"
        targetId={profile.id}
      />
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );


}