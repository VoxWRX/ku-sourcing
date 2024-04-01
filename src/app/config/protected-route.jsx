"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext'; // Adjust the path as necessary

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role === 'loading') return; // Wait until the role is determined

    if (!allowedRoles.includes(role)) {
      // Redirect based on role
      const redirectPath = role === 'admin' ? '/admin-dashboard' : '/login';
      router.push(redirectPath);
    }
  }, [role, router, allowedRoles]);

  if (role === 'loading' || !allowedRoles.includes(role)) {
    return <p>Loading or not authorized...</p>;
  }

  return children;
};

export default ProtectedRoute;
