"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserToken } from '@/features/authSlice'; // adjust path if needed

const InitAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    try {
      const token = localStorage.getItem('access_token');
      if (token && !isTokenExpired(token)) {
        dispatch(setUserToken({ access_token: token }));
      } else {
        localStorage.removeItem('access_token'); // Remove expired token
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, [dispatch]);

  return null; // This component does not render anything
};

const isTokenExpired = (token) => {
   try {
    if (!token || typeof token !== 'string') return true;

    const parts = token.split('.');
    if (parts.length !== 3) return true;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(base64));

    if (!decodedPayload.exp) return true;

    const currentTime = Date.now() / 1000;
    return decodedPayload.exp < currentTime;
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return true; // Treat as expired if any error occurs
  }
};

export default InitAuth;
