import Link from "next/link";
import { Plus } from "lucide-react";
import { MY_OFFERS_EMPTY_STATES } from "./myOffersEmptyStates";
import EmptyStateIcon from "./EmptyStateIcon";

interface Props {
  tab: string;
}

export default function MyOffersEmptyState({ tab }: Props) {
  const config = MY_OFFERS_EMPTY_STATES[tab] ?? MY_OFFERS_EMPTY_STATES.all;

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <EmptyStateIcon icon={config.icon} />
      <p className="font-bold text-black font-baloo text-lg xs:text-xl mt-3 mb-2 md:mb-3">
        {config.title}
      </p>
      <p className="text-muted max-w-120 text-xs xs:text-sm mb-4 md:mb-6">{config.description}</p>

      {config.actionType === "post" && (
        <Link
          href="/offers/create"
          className="bg-primary text-white px-6 py-2 rounded-sm text-xs xs:text-sm lg:text-base font-baloo font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> {config.actionLabel}
        </Link>
      )}

      {config.actionType === "contact-support" && (
        <Link
          href="/help"
          className="bg-primary text-white px-6 py-2 rounded-md text-xs xs:text-sm lg:text-base font-baloo font-semibold hover:bg-orange-700 transition-colors"
        >
          {config.actionLabel}
        </Link>
      )}
    </div>
  );
}