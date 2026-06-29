export interface EmptyStateConfig {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionType?: "post" | "contact-support";
}

export const MY_OFFERS_EMPTY_STATES: Record<string, EmptyStateConfig> = {
  all: {
    icon: "tag",
    title: "Your next great deal starts here",
    description: "You haven’t posted any deals yet. Share an offer, earn trust, and help others discover amazing saving deals.",
    actionLabel: "Post an Awoof",
    actionType: "post",
  },
  approved: {
    icon: "lightning",
    title: "No active deals",
    description: "Approved deals go live here. Post one and get it moving.",
    actionLabel: "Post an Awoof",
    actionType: "post",
  },
  pending: {
    icon: "clock",
    title: "Nothing in review",
    description: "Deals you post sit here while we review them. Won't take long.",
    actionLabel: "Post an Awoof",
    actionType: "post",
  },
  rejected: {
    icon: "x-circle",
    title: "No rejected deals",
    description: "Keep it that way - post quality deals and you'll be fine.",
  },
  suspended: {
    icon: "no-entry",
    title: "No suspended deals",
    description: "All clear! If something was suspended by mistake, reach us.",
    actionLabel: "Contact Support",
    actionType: "contact-support",
  },
  expired: {
    icon: "hourglass",
    title: "No expired deals yet!",
    description: "Past deals will archive here once they run out.",
  },
};