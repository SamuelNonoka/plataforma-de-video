'use client';
import React from 'react';
import { AuthForm } from '@/app/components/AuthForm';

export default function LoginForm() {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <AuthForm formType='login' onSubmit={handleSubmit} />;
}
