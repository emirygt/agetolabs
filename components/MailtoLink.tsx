'use client';

import { track } from '@vercel/analytics';
import type { ReactNode } from 'react';

type Props = {
  email: string;
  source: string;
  children: ReactNode;
  className?: string;
};

export function MailtoLink({ email, source, children, className }: Props) {
  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={() => track('mail_click', { source })}
    >
      {children}
    </a>
  );
}
