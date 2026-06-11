'use client';

import { usePathname } from 'next/navigation';
import { TabButton } from '../tabButton/TabButton';

export default function Tabs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const basePath = `/${segments[0]}/${segments[1]}`;

  const currentPath = pathname;

  return (
    <div className="mt-4 inline-flex gap-6 overflow-x-auto">
      {[
        { title: 'Offers', href: basePath },
        { title: 'About', href: `${basePath}/about` },
      ].map((item) => {
        const isActive = currentPath === item.href;

        return (
          <TabButton
            key={item.href}
            title={item.title}
            isActive={isActive}
            href={item.href}
          />
        );
      })}
    </div>
  );
}