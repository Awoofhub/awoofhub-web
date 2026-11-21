import { useEffect, useState } from "react";

// The comma in <T,> prevents TypeScript from confusing a generic type parameter
// with a JSX element in TSX files. Function declarations (function useSession<T>())
// don't need the comma because TypeScript can distinguish them from JSX.
export const useSession = <T,>(key: string) => {
  const [value, setValue] = useState<T | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }

    setIsLoaded(true);
  }, [key]);

  const setSessionValue = (newValue: T) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setSessionValue, isLoaded] as const;
};

