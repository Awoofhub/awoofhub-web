import { useEffect, useState } from "react";

export function useTruncateLength() {
  const [length, setLength] = useState(110);

  useEffect(() => {
    const updateLength = () => {
      const width = window.innerWidth;
      if (width >= 1024) setLength(140);
      else if (width >= 768) setLength(110);
      else setLength(75);
    };

    updateLength();
    window.addEventListener("resize", updateLength);
    return () => window.removeEventListener("resize", updateLength);
  }, []);

  return length;
}