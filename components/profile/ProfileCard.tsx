"use client";
import AlertButton from "../alert/Alert";
import ChatButton from "../chat/ChatButton";
import ReportModal from "@/components/modals/ReportModal";
import { User } from "@/types/user";
import { capitalizeFirstLetter } from "@/utils/truncate";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { Plus } from "lucide-react";
import { MdOutlineChat } from "react-icons/md";

interface Props {
  isOwnProfile: boolean;
  profile: User;
}

export default function ProfileCard({ isOwnProfile, profile }: Props) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const target = e.target;
      if (target instanceof Node && dropdownRef.current?.contains(target))
        return;
      setIsOpenDropdown(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 bg-white rounded-2xl px-4 py-8 shadow-sm border border-gray-100 relative">
        {!isOwnProfile && (
          <div ref={dropdownRef} className="absolute right-3 top-3">
            <button
              onClick={() => setIsOpenDropdown((prev) => !prev)}
              className="cursor-pointer p-2 rounded-xl bg-white"
            >
              <BsThreeDots className="text-black" />
            </button>
            {isOpenDropdown && (
              <div className="w-40  absolute text-[#E70606] border border-[#E70606] right-0 mt-2 bg-white rounded-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setIsReportOpen(true);
                    setIsOpenDropdown(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 hover:bg-gray-100 font-medium"
                >
                  <span>Report User</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col mb-4">
          <div className="w-30 h-30  border-2 border-[#FF4D0D] rounded-full overflow-hidden mb-3 mx-auto">
            {profile.profileImageUrl ? (
              <Image
                width={200}
                height={200}
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

          <div className="flex items-center gap-1 lg:gap-2 flex-wrap">
            <h1 className="text-[22px] lg:text-2xl font-semibold text-black">
              {profile.name}
            </h1>
            <span className="flex items-center gap-1 bg-[#FFF0EC] text-primary text-xs font-semibold px-2 py-1 rounded-full">
              <FaRegUser size={10} /> Awoofer
            </span>
          </div>

          <div className="flex items-start gap-1 text-black text-sm lg:text-base font-medium mt-1 flex-wrap">
            <span>@{profile.username}</span>
            {profile.address && (
              <>
                <span>•</span>
                <FiMapPin size={12} />
                <span>{profile.address}</span>
              </>
            )}
          </div>

          {profile.bio ? (
            <p className="text-muted text-sm lg:text-base mt-3 text-start">
              {profile.bio}
            </p>
          ) : (
            <p className="text-muted text-sm lg:text-base mt-3 py-2">
              No bio added.
            </p>
          )}

          <p className="text-primary text-sm font-medium mt-3">
            Awoofer since {format(new Date(profile.createdAt), "MMMM yyyy")}
          </p>
        </div>

        {!isOwnProfile && (
          <ChatButton targetUserId={profile.id}>
            <span className="w-full mt-8 mb-6 text-center border border-primary text-primary py-2 rounded-md text-sm lg:text-base font-medium font-baloo hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
              <MdOutlineChat className="w-5 h-5" />
              Message
            </span>
          </ChatButton>
        )}

        <div className=" py-4 space-y-3">
          <div className="flex justify-between px-4 py-6 border border-muted/10 shadow-lg rounded-md items-center">
            <span className=" text-muted text-sm font-semibold">
              DEALS POSTED
            </span>
            <span className="font-bold text-lg text-black">
              {profile.numOfDealPosted ?? 0}
            </span>
          </div>
          <div className="flex justify-between px-4 py-6 border border-muted/10 shadow-lg rounded-md items-center">
            <span className="text-muted text-sm font-semibold">
              OFFER CLICKS
            </span>
            <span className="font-bold text-lg text-black">
              {profile.offerClicks ?? 0}
            </span>
          </div>
        </div>

        {isOwnProfile && (
          <div className="flex flex-col gap-3 my-6">
            <Link
              href="/profile/edit"
              className="w-full text-center border border-primary text-primary py-3 rounded-md text-base font-semibold hover:bg-orange-50 transition-colors"
            >
              Edit Profile
            </Link>
            <Link
              href="/offers/create"
              className="w-full text-center bg-primary text-white py-3 rounded-md text-base font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-5 h-5" />
              Post Awoof
            </Link>
          </div>
        )}

        {!isOwnProfile && (
          <div className="bg-[#FFF6F2] border shadow-md border-[#F7D9CC] p-3 rounded-lg my-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-base font-medium font-baloo text-black">
                  Post alerts
                </p>
                <p className="text-sm text-muted">
                  Get notified when {profile.name.split(" ")[0]} posts.
                </p>
              </div>
              <AlertButton contributorId={profile.id} />
            </div>
          </div>
        )}
      </div>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="user"
        targetId={profile.id}
        targetName={profile.name}
        targetEmail={profile.email}
        targetImage={profile.profileImageUrl}
        targetBadge={
          profile.role === "business"
            ? "Business Account"
            : "Individual Account"
        }
      />
    </>
  );


}
