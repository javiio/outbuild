'use client';

import type { Metadata } from "next";
import { ProvideData } from '@/core/data';
import { AuthRedirect } from '@/auth';
import { ProvideUsers } from '@/users';

import "../globals.css";

// export const metadata: Metadata = {
//   title: "Outbuild Kanban",
//   description: "Real-time Kanban board for remote teams",
// };

export default function RootLayout({
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
