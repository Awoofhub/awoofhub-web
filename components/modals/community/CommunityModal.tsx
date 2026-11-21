import { Gift, Lightbulb, MessageSquareHeart, MessagesSquare, SlidersHorizontal, Sparkles, Users, X, Zap } from "lucide-react";
import { FaPeopleGroup, FaWhatsapp } from "react-icons/fa6";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BENEFITS = [
  {
    icon: Zap,
    text: "Instant and real-time deal alerts",
  },
  {
    icon: MessageSquareHeart,
    text: "Daily gists and direct chats with fellow Awoofers",
  },
  {
    icon: SlidersHorizontal,
    text: "A say in what we build next – all on WhatsApp",
  },
];


export default function CommunityModal({ isOpen, onClose }: Props) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative grid w-full max-w-[820px] max-h-[70vh] lg:mt-10 grid-cols-1 overflow-y-auto scrollbar-tiny rounded-2xl bg-white shadow-2xl md:grid-cols-[290px_1fr]" onClick={(e) => e.stopPropagation()}>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/40"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative flex min-h-[210px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#FF4A00] to-[#FF3B00] p-8 md:min-h-[430px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-16 h-24 w-24 rounded-full bg-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 left-6 h-24 w-24 rounded-full bg-white/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-6 h-28 w-28 rounded-full bg-white/10"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-14 top-28 h-2 w-2 rotate-45 bg-white/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-14 top-32 h-2.5 w-2.5 rotate-45 bg-white/75"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-24 left-16 h-1.5 w-1.5 rotate-45 bg-white/60"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-20 right-16 h-2 w-2 rotate-45 bg-white/70"
          />


          <div className="relative flex items-center justify-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/25 bg-white/10">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/35 bg-white/15 shadow-inner">
                <FaPeopleGroup className="h-16 w-16 text-white" />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-7 h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-white/45 to-transparent"
            />
          </div>
        </div>

        {/* Right Content Column */}
        <div className="flex flex-col justify-center px-6 py-8 sm:px-9 sm:py-9">
          {/* Top Pill + Exclusive Tag */}
          <div className="mb-4 flex flex-wrap items-center gap-2.5 pr-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0EA] px-3 py-1 text-xs font-semibold text-[#FF4D00]">
              <Users className="h-3.5 w-3.5" />
              Community
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Exclusive
            </span>
          </div>

          <h2
            id="awoofer-modal-title"
            className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-[32px] sm:leading-[1.15]"
          >
            Don't enjoy the <span className="text-[#FF4D00]">awoof</span> alone! 
          </h2>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
             Join the Awoofers Community and connect with people who love finding and sharing awoof!

          </p>

          <ul className="mt-5 space-y-3">
            <li className="flex items-center gap-3 text-sm font-medium text-neutral-700" >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#FFF3EE] text-[#FF4D00]">
                <Gift className="h-3.5 w-3.5" />
              </span>
              <span>Share and discover awoof</span>
            </li>

            <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#FFF3EE] text-[#FF4D00]">
                <MessagesSquare className="h-3.5 w-3.5" />
              </span>
              <span>Daily gist and conversations with fellow Awoofers</span>
                    
            </li>

            <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#FFF3EE] text-[#FF4D00]">
                <Lightbulb className="h-3.5 w-3.5" />
              </span>
              <span>A say in what we build next</span>
            </li>
          </ul>

          <div className="mt-7 flex flex-col items-center gap-3">
            <a
              href="https://chat.whatsapp.com/Lp7SjLs7drx11MxHl5zVgy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#FF4D00] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e84500] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/40"
            >
              <FaWhatsapp className="h-4.5 w-4.5" />
              <span>Join the community</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-[#FF4D00] transition hover:text-[#d94100] hover:underline focus:outline-none"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

