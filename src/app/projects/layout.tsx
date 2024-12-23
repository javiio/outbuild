'use client';

import type { Metadata } from "next";
import { ProvideData } from '@/core/data';
import { AuthRedirect } from '@/auth';
import { Providers, AppLayout } from "@/core/ui";

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
  // return (
  //   <ProvideData>
  //     <AuthRedirect>
  //       <Providers>
  //         <AppLayout>
  //           {children}
  //         </AppLayout>
  //       </Providers>
  //     </AuthRedirect>
  //   </ProvideData>
  // );

  return <>{children}</>
}
