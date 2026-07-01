'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function OfferModalBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (pathname !== '/my-offers') return;

    const offerTitle = searchParams.get('offerTitle');
    const offerId = searchParams.get('offerId');

    if (!offerTitle && !offerId) return;

    if (attemptedRef.current) return;
    attemptedRef.current = true;

    const tryOpenModal = () => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const targetButton = buttons.find((button) => {
        const text = button.textContent?.toLowerCase() ?? '';
        return offerTitle ? text.includes(offerTitle.toLowerCase()) : false;
      });

      if (targetButton) {
        targetButton.click();
        const params = new URLSearchParams(window.location.search);
        params.delete('offerTitle');
        params.delete('offerId');
        const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        router.replace(nextUrl);
        return true;
      }

      return false;
    };

    const intervalId = window.setInterval(() => {
      if (tryOpenModal()) {
        window.clearInterval(intervalId);
      }
    }, 400);

    window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 5000);
  }, [pathname, searchParams, router]);

  return null;
}
