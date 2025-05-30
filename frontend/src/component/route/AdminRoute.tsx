// AdminRoute.tsx
import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
  return null;
}

function getUserRoleFromToken(): string | null {
  const token = getCookie('access_token'); // имя куки с JWT
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson) as { role?: string };
    return payload.role ?? null;
  } catch {
    return null;
  }
}

interface AdminRouteProps {
  element: ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const role = getUserRoleFromToken();
  console.log('Role from token:', role);
  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default AdminRoute;
