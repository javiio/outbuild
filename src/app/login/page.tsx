'use client';

import React from 'react';
import { AuthForm } from '@/auth';

export default function Login() {
  return (
      <div className="inset-0 fixed flex flex-col items-center justify-center">
        <AuthForm />
      </div>
  );
};
