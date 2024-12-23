'use client';

import Head from 'next/head';
import { ProvideData } from '@/core/data';
import { AuthRedirect } from '@/auth';
import { Providers, AppLayout } from "@/core/ui";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Outbuild | Kanban</title>
      </head>
      <body>
        <ProvideData>
          <AuthRedirect>
            <Providers>
              <AppLayout>
                {children}
              </AppLayout>
            </Providers>
          </AuthRedirect>
        </ProvideData>
      </body>
    </html>
  );
}
