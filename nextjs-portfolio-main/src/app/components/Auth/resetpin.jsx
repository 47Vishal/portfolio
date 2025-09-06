
"use client"
import { useState } from 'react';
import {useResetUserPasswordMutation, } from '../../../services/userAuthAPI';
import { useRouter, useParams } from 'next/navigation';

export async function generateStaticParams() {
  return []; // ✅ Required for static export with dynamic route
}

const initial_values ={
    password : "",
    password_confirmation :"",
}

const ResetPin = () => {
    const { uid, token } = useParams();
    const [ResetUserPassword, { isLoading }] = useResetUserPasswordMutation()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const Navigate = useRouter();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const ResetpinSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const res = await ({
                actualData: { password: newPassword, confirm_password: confirmPassword },
                uid,
                token
            }).unwrap();
            if (res.data) {
                setMessage(res.msg || "Password reset successful!");
                setTimeout(() => Navigate.push("/login"), 2000);
            }
            else if (res.error) {
                setServerError(res.error.data.errors)
                setServerMsg({})
                //setServerMsg({})  this mean 
            }
        } catch (err) {
            console.error('❗ Reset error object:', err);
            if(err) {
                setError("Unexpected error. Please try again.");
            }
        }


    };
    return (
        <>
            {/* This is Sign-in Form */}
            <div className="min-h-screen flex items-center justify-center bg-gray-80">
                <div className="bg-[#121212] border border-[#33353F] p-8 rounded-lg shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-6">Reset Your Password</h2>
                    <form onSubmit={ResetpinSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-200">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>
                        {error.non_field_errors && (
                            <p className="text-sm text-red-400">{error.non_field_errors[0]}</p>
                        )}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ResetPin