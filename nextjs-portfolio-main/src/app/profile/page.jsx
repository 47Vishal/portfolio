'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from '../components/Auth/protect_route';
import { useGetLoggedUserQuery } from '@/services/userAuthAPI';
import { setUserInfo } from '@/features/userSlice';
import { getToken } from '@/services/LocalStoreService';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { UnsetUserInfo } from "@/features/userSlice";
import { UnsetUserToken } from "@/features/authSlice";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Profile = () => {
    const dispatch = useDispatch();
    const MyUser = useSelector((state) => state.user);
    const [accessToken, setAccessToken] = useState(null);


    const navigate = useRouter();

    // Only read localStorage client-side
    useEffect(() => {
        const { access_token } = getToken();
        if (access_token) {
            setAccessToken(access_token);
        } else {
            // Redirect if no token found
            navigate.push('/');
        }
    }, [navigate]);

    // Query user info from backend
    const { data, error, isLoading, isSuccess } = useGetLoggedUserQuery(accessToken, {
        skip: !accessToken,
    });
    // Save user data to Redux
    useEffect(() => {
        if (data && isSuccess) {
            dispatch(setUserInfo({
                First_name: data.First_name,
                Last_Name: data.Last_Name, // ✅ Make sure this matches the state
                email: data.email
            }));
        }
    }, [data, isSuccess, dispatch]);

    // Handle logout
      const handleLogout = async () => {
    const { refresh_token, access_token } = getToken();
    // const refreshToken = localStorage.getItem('refresh_token');
    console.log("Logging out with refresh token:", refresh_token);
    try {
      if (!refresh_token || !access_token) {
        console.warn('No refresh token found.');
      } else {
        await userLogOut({
          refreshToken: refresh_token,
          accessToken: access_token,
        }).unwrap(); // optional: unwrap for better error handling;
      }
      // Clear authentication tokens
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token');
      // Clear tokens and Redux
      remove_Token();
      // Optionally, reset Redux state if using Redux for state management
      dispatch(UnsetUserToken({ access_token: null }));
      dispatch(UnsetUserInfo({ name: '', email: '' }));

      // Redirect to login page
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

if (isLoading) {
  return (
    <div className="flex justify-center items-center h-screen text-white">
      Loading profile...
    </div>
  );
}
if (error) {
  return (
    <div className="text-center mt-20 text-red-400">
      Failed to load profile. Please{" "}
      <button
        onClick={handleLogout}
        className="text-purple-500 underline hover:text-purple-300"
      >
        log in again
      </button>.
    </div>
  );
}


    return (
        <ProtectedRoute>
            <main className="flex flex-col bg-[#121212]">
                <Navbar />
                <div className="container mt-24 mx-auto">
                    <div className="min-h-screen p-6 bg-gray-900 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Sidebar */}
                            <div className="md:col-span-3 bg-gray-800 p-4 rounded-lg shadow mb-6 md:mb-0">
                                <h2 className="text-xl font-semibold mb-4">User Profile</h2>
                                <ul className="space-y-2 text-sm">
                                    <li className="hover:text-purple-400 cursor-pointer"><Link href="/profile/change_password">Change Password</Link></li>
                                    <li className="hover:text-purple-400 cursor-pointer" onClick={handleLogout}>Log Out</li>
                                </ul>
                            </div>

                            {/* Main Content */}
                            <div className="md:col-span-9 flex justify-center">
                                <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow">
                                    <h3 className="text-2xl font-bold mb-4">Account Information</h3>
                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <label className="block text-gray-400">First Name:</label>
                                            <p>{MyUser?.First_name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-gray-400">Last Name:</label>
                                            <p>{MyUser?.Last_Name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-gray-400">Email:</label>
                                            <p>{MyUser?.email || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </ProtectedRoute>
    );
};

export default Profile;
