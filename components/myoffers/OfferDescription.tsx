import { useState } from "react";
import { useTruncateLength } from "./useTruncateLength";

interface Props {
  description: string;
}

export default function OfferDescription({ description }: Props) {
  const [showFull, setShowFull] = useState(false);
  const truncateLength = useTruncateLength();

  const isLong = description.length > truncateLength;
  const truncatedText = isLong ? description.slice(0, truncateLength).trimEnd() : description;

  return (
    <p className="text-sm text-muted mb-2">
      {showFull ? description : truncatedText}
      {isLong && (
        <button
          onClick={() => setShowFull((prev) => !prev)}
          className="text-primary font-medium ml-1 cursor-pointer"
        >
          {showFull ? "less" : "...more"}
        </button>
      )}
    </p>
  );
}