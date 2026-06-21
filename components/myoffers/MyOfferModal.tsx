import { Offer } from "@/types/offer";
import OfferStatusModal from "./OfferStatusModal";

interface Props {
  offer: Offer | null;
  onClose: () => void;
}

export default function MyOfferModal({ offer, onClose }: Props) {
  if (!offer) return null;
  return <OfferStatusModal offer={offer} onClose={onClose} />;
}