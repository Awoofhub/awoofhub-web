import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type FilterValue = string | number | undefined | null;

export function useFilter(basePath: string) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateFilter = useCallback(
    (keyOrUpdates: string | Record<string, FilterValue>, value?: FilterValue) => {
      const params = new URLSearchParams(searchParams.toString());

      if (typeof keyOrUpdates === 'string') {
        if (value) {
          params.set(keyOrUpdates, String(value));
        } else {
          params.delete(keyOrUpdates);
        }
      } else {
        Object.entries(keyOrUpdates).forEach(([k, v]) => {
          if (v) {
            params.set(k, String(v));
          } else {
            params.delete(k);
          }
        });
      }

        params.delete("page");

      const query = params.toString();
      const nextUrl = query ? `${basePath}?${query}` : basePath;

      console.log("[useFilter] Before replace:", window.location.href);
      console.log("[useFilter] Navigating to:", nextUrl);

      router.replace(nextUrl, { scroll: false });

      setTimeout(() => {
        console.log(
          "[useFilter] After replace:",
          window.location.href
        );
      }, 1000);
    
    },
    [searchParams, router, basePath]
  );

  return updateFilter;
}