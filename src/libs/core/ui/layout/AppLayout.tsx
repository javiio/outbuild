import React from 'react';
import { usePathname } from 'next/navigation';
import { MembersList } from '@/users';
import { SidebarMenu, Providers } from '@/core/ui';
import { ActivitysLog } from '@/logs';
import GeneratedStyles from './GeneratedStyles';

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const pathname = usePathname();

  if (pathname === '/login') {
    return children;
  }

  return (
    <Providers>
      <div className="w-full h-20 top-0 left-0 right-0 bg-slate-950/50 border-b border-b-slate-700 -z-1" />
      <div className="absolute w-80 top-4 bottom-4 left-12">
        <div className="w-full rounded-lg bg-slate-800 h-full border-slate-700 shadow-md overflow-y-auto">
          <MembersList />
          <ActivitysLog />
        </div>
      </div>
      <SidebarMenu />

      <main className="-mt-12 ml-[368px] h-[calc(100vh-5.1rem)] relative">
        {children}
      </main>

      <GeneratedStyles />
    </Providers>
  );
};
