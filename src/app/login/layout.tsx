'use client';

import { ProvideData } from '@/core/data';
import { AuthRedirect } from '@/auth';
import { ProvideUsers } from '@/users';

import "../globals.css";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProvideData>
      <AuthRedirect>
        <ProvideUsers>
          {children}
        </ProvideUsers>
      </AuthRedirect>
    </ProvideData>
  );
}
