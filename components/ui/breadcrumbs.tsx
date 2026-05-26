'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className = '',
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-8 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2 min-w-0">
              {i > 0 && (
                <ChevronRight
                  size={14}
                  className="text-gray-600 shrink-0"
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#8EF0B5] transition-colors truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-white/80 truncate"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
