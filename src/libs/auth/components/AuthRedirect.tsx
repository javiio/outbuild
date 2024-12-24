'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PageLoader } from '@/core/ui';
import { useAuth } from '../';

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const [forceLoadingLogo, setForceLoadingLogo] = useState(true);
  const { currentUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setForceLoadingLogo(false);
    }, 1400);
  }, []);

  useEffect(() => {
    if (!forceLoadingLogo && currentUser === undefined && pathname !== '/login') {
      router.push('/login');
    }
  }, [router, currentUser, pathname, forceLoadingLogo]);

  if (pathname === '/login') {
    return children;
  }

  if (forceLoadingLogo || !currentUser) {
    return <PageLoader />;
  }

  return children;
};
