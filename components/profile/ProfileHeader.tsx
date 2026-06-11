"use client";
import ReportModal from "@/components/modals/ReportModal";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { capitalizeFirstLetter } from "@/utils/truncate";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { RiLink } from "react-icons/ri";
import ProfileActionButtons from "./ProfileActionButtons";
import Tabs from "./Tabs";

interface Props {
  isOwnProfile: boolean;
  profile: User;
}

export default function ProfileHeader({
  isOwnProfile,
  profile,
}: Props) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const target = e.target;
      if (target instanceof Node && dropdownRef.current?.contains(target)) {
        return;
      }
      setIsOpenDropdown(false);
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Main Card */}
      <div className="relative bg-white rounded-3xl px-4">
        <div className="flex flex-col pt-10 md:pt-0 md:flex-row items-center gap-6">
          <div className="w-30 h-30 sm:w-40 sm:h-40 rounded-full overflow-hidden">
            {profile.profileImageUrl ? (
              <Image
                width={500}
                height={500}
                src={profile.profileImageUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-green-500 text-white text-[70px] font-semibold flex items-center justify-center w-full h-full">
                {capitalizeFirstLetter(profile.name)}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between gap-2 flex-1 md:pt-4 w-full md:min-h-[180px]">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              {profile.name}
            </h1>

            {profile.website && (
              <p className="flex items-center gap-3 text-gray-500">
                <RiLink size={20} />
                <span className="flex items-center gap-3 text-sm lg:text-base text-blue-500 fond-medium">
                  {profile.website}
                </span>
              </p>
            )}

            <p className="text-gray-600 text-sm lg:text-base break-all">
              {profile.bio || "No bio yet"}
            </p>

            <div className="flex mt-3 items-center gap-3">
              {isOwnProfile ? (
                <Link
                  href="/profile/edit"
                  className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit Profile
                </Link>
              ) : (
                <ProfileActionButtons targetUserId={profile.id} />
              )}
            </div>

            <Tabs />
          </div>
        </div>

        {/* RIGHT SIDE (DROPDOWN) */}
        {!isOwnProfile && (
          <div ref={dropdownRef} className="absolute right-3 top-3">
            {/* TRIGGER BUTTON */}
            <button
              onClick={toggleDropdown}
              className={cn(
                "cursor-pointer p-2 rounded-xl",
                isOpenDropdown ? "bg-black" : "bg-white",
              )}
            >
              <BsThreeDots
                className={cn(!isOpenDropdown ? "text-black" : "text-white")}
                size={20}
              />
            </button>

            {/* DROPDOWN */}
            {isOpenDropdown && (
              <div className="w-40 absolute right-0 mt-2 bg-white rounded-xl shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] overflow-hidden z-50">
                <button
                  onClick={() => {
                    setIsReportOpen(true);
                    setIsOpenDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 font-semibold"
                >
                  <MdOutlineReport size={18} />
                  <span>Report</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Report Modal */}
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
    </div>
  );
}
