'use client';

import { useState } from 'react';
import { useChangeUserPasswordMutation } from '../../../services/userAuthAPI';
import { getToken, } from '../../../services/LocalStoreService';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import ProtectedRoute from '../../components/Auth/protect_route';
import { UnsetUserInfo } from '@/features/userSlice';
import { UnsetUserToken } from '@/features/authSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from "next/link";

function ChangePin() {
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [changeUserPassword, { isLoading }] = useChangeUserPasswordMutation();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState('');

    const navigate = useRouter();
    const dispatch = useDispatch();
    const handleLogout = () => {
        // Clear authentication tokens
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Optionally, reset Redux state if using Redux for state management
        dispatch(UnsetUserToken({ access_token: null }));
        dispatch(UnsetUserInfo({ name: '', email: '' }));

        // Redirect to login page
        navigate.push('/');
    };

    const { access_token } = getToken();
    const ChangePinSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        setSuccessMessage('');
        const actualPinChangeData = {
            current_password: currentPassword,
            password: newPassword,
            confirm_password: confirmPassword,
        }
        try {
            const res = await changeUserPassword({ actualPinChangeData, access_token })
            if (res.error) {
                setErrors(res.error.data.errors)
                console.log("Change password errors:", res.error.data.errors)
                setSuccessMessage('');
                //setSuccessMessage({})  this mean 
            }
            if (res.data) {
                setSuccessMessage(res.data.msg)
                setErrors({})
                document.getElementById('Change_Pin_Form').reset();
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => navigate.push('/profile'), 2000);
            }
        } catch (err) {
            console.error("Change Pin Error:", err);
            setErrors({ non_field_errors: ['Unexpected error occurred.'] });

        }
    };
    return (
        <>

            {/* Password */}
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
                                        <li className="hover:text-purple-400 cursor-pointer">Change Password</li>
                                        <li className="hover:text-purple-400 cursor-pointer" onClick={handleLogout}>Log Out</li>
                                    </ul>
                                </div>

                                {/* Main Content */}
                                <div className="md:col-span-9 flex justify-center">
                                    <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow">
                                        <h3 className="text-2xl font-bold mb-4">Change Password</h3>
                                        <form id='Change_Pin_Form' className="flex flex-col gap-4" onSubmit={ChangePinSubmit}>
                                            <div className="space-y-4 text-sm">
                                                {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}
                                                {errors.non_field_errors && (
                                                    <p className="text-sm text-red-400">{errors.non_field_errors[0]}</p>
                                                )}

                                                <div>
                                                    <label htmlFor="current_password" className="text-white block mb-2 text-sm font-medium">Current Password</label>
                                                    <input
                                                        type="password"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className={`bg-[#18191E] border ${errors.current_password ? 'border-red-500' : 'border-[#33353F]'} placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5`}
                                                    />
                                                    {errors.current_password && <p className="text-sm text-red-400">{errors.current_password}</p>}
                                                </div>


                                                {/* Password */}
                                                <div>
                                                    <label htmlFor="password" className="text-white block mb-2 text-sm font-medium">Password</label>
                                                    <input
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className={`bg-[#18191E] border ${errors.password ? 'border-red-500' : 'border-[#33353F]'} placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5`}
                                                    />
                                                    {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                                                </div>

                                                {/* Confirm Password */}
                                                <div>
                                                    <label htmlFor="confirm_password" className="text-white block mb-2 text-sm font-medium">Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className={`bg-[#18191E] border ${errors.confirm_password ? 'border-red-500' : 'border-[#33353F]'} placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5`}
                                                    />
                                                    {errors.confirm_password && <p className="text-sm text-red-400">{errors.confirm_password}</p>}
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-5 rounded-lg w-full"
                                            >
                                                {isLoading ? 'Changing...' : 'Change Password'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </main>
            </ProtectedRoute>

        </>

    )
}

export default ChangePin