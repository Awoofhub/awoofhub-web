"use client";

import { Share2, X as CloseIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FiCopy } from "react-icons/fi";

interface Props {
  offerId: string;
  variant?: "default" | "menuItem";
  onTriggerClick?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ShareModal({
  offerId,
  variant = "default",
  onTriggerClick,
  open: controlledOpen,
  onOpenChange,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setInternalOpen;

  const [show, setShow] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/offers/${offerId}`
      : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  const shareOptions = [
    {
      label: "Whatsapp",
      icon: "/WhatsApp.png",
      onClick: () =>
        window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      label: "Instagram",
      icon: "/Instagram.png",
      onClick: async () => {
        await copyLink();
        window.open("https://www.instagram.com/", "_blank");
      },
    },
    {
      label: "X (Twitter)",
      icon: "/X.png",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
          "_blank",
        ),
    },
    {
      label: "Facebook",
      icon: "/Facebook.png",
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        ),
    },
    {
      label: "TikTok",
      icon: "/Tiktok.png",
      onClick: async () => {
        await copyLink();
        window.open("https://www.tiktok.com/", "_blank");
      },
    },
  ];

  const handleTriggerClick = () => {
    setOpen(true);
    onTriggerClick?.();
  };

  return (
    <>
      {variant === "menuItem" ? (
        <button
          onClick={handleTriggerClick}
          className="flex items-center gap-2 font-baloo text-sm text-black hover:bg-orange-50"
        >
         <Share2 size={15} /> Share offer
        </button>
      ) : (
        <div className="flex gap-4 text-[10px] xs:text-xs md:text-sm lg:text-base text-black">
          <button
            onClick={handleTriggerClick}
            className="cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            <Share2 size={18} /> Share
          </button>
        </div>
      )}

      {show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg z-[1100]">
          Link copied!
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 px-4">
          <div className="bg-white w-full xs:max-w-[500px] lg:max-w-[640px] rounded-2xl p-6 xs:p-10 lg:p-12 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-black hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <CloseIcon size={22} />
            </button>

            <h3 className="text-lg md:text-2xl font-bold text-black mt-6">
              Share this unique deal with friends
            </h3>
            <p className="text-muted font-montserrat font-normal text-sm md:text-base mb-4">
              Awoof is best enjoyed when shared with friends and families,
              share directly or copy the link below.
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-8 mb-6">
              {shareOptions.map(({ label, icon, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex flex-col items-center  cursor-pointer"
                >
                  <span className="w-12 h-12 xs:w-16 xs:h-16 lg:w-18 lg:h-18 flex items-center justify-center">
                    <Image src={icon} alt={label} width={100} height={100} />
                  </span>
                  <span className="text-[10px] xxs:text-xs lg:text-sm font-baloo text-gray-900">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 border border-primary rounded-sm px-4 lg:px-6 py-3">
              <span className="text-xs xs:text-sm text-muted truncate">{url}</span>
              <button
                onClick={copyLink}
                className="text-primary text-lg xs:text-xl shrink-0 cursor-pointer hover:text-orange-600 transition-colors"
                aria-label="Copy link"
              >
                {show ? <IoCheckmarkSharp /> : <FiCopy />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}