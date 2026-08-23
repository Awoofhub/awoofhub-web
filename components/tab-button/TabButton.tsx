import { cn } from '@/lib/utils';
import { capitalize } from 'lodash';
import Link from 'next/link';

export function TabButton({ isActive, title, href }: { isActive?: boolean; title: string; href: string }) {
  return (
    <Link aria-label={title} className="flex cursor-pointer flex-col items-center gap-2" href={href}>
      <h2
        className={cn(
          isActive ? 'font-bold text-black' : 'font-semibold text-gray-600 hover:text-gray-600/50',
        )}>
        {capitalize(title)}
      </h2>
      {isActive && <div className="h-[2px] w-full bg-foreground" />}
    </Link>
  );
}