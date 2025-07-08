// src/app/components/Auth/ProtectedRoute.jsx
'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isTokenExpired } from '@/app/utils/jwtUtils';
import { UnsetUserToken } from "@/features/authSlice";
import { UnsetUserInfo } from "@/features/userSlice";

const ProtectedRoute = ({ children }) => {
  const access_token = useSelector((state) => state.auth.access_token);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!access_token || isTokenExpired(access_token)) {
      // Clear stale tokens
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Clear Redux state
      dispatch(UnsetUserToken());
      dispatch(UnsetUserInfo());

      router.push('/'); // Redirect to home or login page
    }
  }, [access_token, dispatch, router]);

  if (!access_token || isTokenExpired(access_token)) {
    return null;
  } // Optionally show loader
  return children;
};

export default ProtectedRoute;
