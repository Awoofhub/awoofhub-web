import { DisplayStatus } from "@/utils/offerStatus";
import Image from "next/image";

const STATUS_STYLES: Record<DisplayStatus, string> = {
  active: "text-[#00A95D]",
  pending: "text-[#C29A06]",
  rejected: "text-[#CD0F0F]",
  suspended: "text-[#FFC000]",
  expired: "text-[#555555]",
};

const STATUS_LABEL: Record<DisplayStatus, string> = {
  active: "Active",
  pending: "Pending",
  rejected: "Rejected",
  suspended: "Suspended",
  expired: "Expired",
};

const STATUS_ICON: Record<DisplayStatus, string> = {
  active: "/active.svg",
  pending: "/pending.svg",
  rejected: "/rejected.svg",
  suspended: "/suspended.svg",
  expired: "/expired.svg",
};

interface Props {
  status: DisplayStatus;
}

export default function StatusBadge({ status }: Props) {
  return (
    <span className={`inline-flex items-center gap-1 text-[8px] xs:text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {STATUS_LABEL[status]}
      <Image src={STATUS_ICON[status]} alt={status} width={15} height={15} className="w-[10px] h-[10px] xs:w-[20px] xs:h-[20px] "/>
    </span>
  );
}