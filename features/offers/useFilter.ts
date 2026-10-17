import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type FilterValue = string | number | undefined | null;

export function useFilter(basePath: string) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [params, setParamsState] = useState(new URLSearchParams(searchParams));

  const updateFilter = (key: string, value?: FilterValue) => {
    const updatedParams = new URLSearchParams(params);

    if (value) {
      updatedParams.set(key, String(value));
      setParamsState(updatedParams);
    } else {
      updatedParams.delete(key);
    }

    router.replace(`${basePath}?${updatedParams.toString()}`);
  }

  return updateFilter;
}


