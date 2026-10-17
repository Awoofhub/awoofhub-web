import { useRouter, useSearchParams } from 'next/navigation';

type FilterValue = string | number | undefined | null;

export function useFilter(basePath: string) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateFilter = (key: string, value?: FilterValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }

    router.replace(`${basePath}?${params.toString()}`);
  }

  return updateFilter;
}


