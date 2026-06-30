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
import { GoDotFill } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { Plus } from "lucide-react";
import { MdOutlineChat } from "react-icons/md";
import EditProfileModal from "../modals/EditProfileModal";

interface Props {
  isOwnProfile: boolean;
  profile: User;
}

export default function ProfileCard({ isOwnProfile, profile }: Props) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
      <div className="w-full xs:w-1/3 lg:w-1/4 shrink-0 bg-white rounded-2xl px-4 xs:px-2 xl:px-4 py-6 xl:py-8 shadow-sm border border-gray-100 relative">
        {!isOwnProfile && (
          <div ref={dropdownRef} className="absolute right-3 top-3">
            <button
              onClick={() => setIsOpenDropdown((prev) => !prev)}
              className="cursor-pointer pt-4"
            >
              <BsThreeDots className="text-black" size={25} />
            </button>
            {isOpenDropdown && (
              <div className="w-32 absolute text-[#E70606] border border-[#E70606] right-0 bg-white rounded-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setIsReportOpen(true);
                    setIsOpenDropdown(false);
                  }}
                  className="text-sm w-full flex items-center justify-center gap-2 px-4 py-3 hover:bg-gray-100 font-medium"
                >
                 Report User
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col mb-4">
          <div className={`w-25 h-25 xs:w-20 xs:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 xl:w-30 xl:h-30 border-2 border-[#FF4D0D] rounded-full overflow-hidden mb-3 ${isOwnProfile ? 'xs:mx-auto' : ''}`}>
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

          <div className="flex items-center gap-4 xs:gap-2 lg:gap-4 flex-wrap">
            <h1 className="text-xl  md:text-lg xl:text-2xl font-semibold text-black">
              {profile.name}
            </h1>
            <span className="flex items-center gap-1 bg-[#FFF0EC] text-primary text-xs font-semibold px-2 py-1 rounded-full">
              <FaRegUser size={10} /> Awoofer
            </span>
          </div>

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

          <p className="text-primary text-sm xs:text-sm font-medium mt-3">
            Awoofer since {format(new Date(profile.createdAt), "MMMM yyyy")}
          </p>
        </div>

        {!isOwnProfile && (
          <ChatButton targetUserId={profile.id}>
            <span className="w-full mt-6 mb-4 text-center border border-primary text-primary py-2 rounded-md text-sm lg:text-base font-medium font-baloo hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
              <MdOutlineChat className="w-5 h-5" />
              Message
            </span>
          </ChatButton>
        )}

        <div className=" xs:py-4 space-y-2 xs:space-y-3">
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
                  Post alerts
                </p>
                <p className="text-xs xs:text-[10px] xl:text-xs text-muted">
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
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );


}
