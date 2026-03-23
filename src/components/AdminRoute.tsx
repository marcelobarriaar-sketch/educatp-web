import React from 'react';
import { Navigate } from 'react-router-dom';

const STORAGE_KEY = 'educatp_admin_auth';

type Props = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: Props) {
  const isAuthenticated = localStorage.getItem(STORAGE_KEY) === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
