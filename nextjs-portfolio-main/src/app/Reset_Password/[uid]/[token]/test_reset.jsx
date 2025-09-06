"use client";
import { useState } from "react";
import { useResetUserPasswordMutation } from "@/services/userAuthAPI";
import { useRouter, useParams } from "next/navigation";



const ResetPin = () => {
  const [resetUserPassword, { isLoading }] = useResetUserPasswordMutation();
  const router = useRouter();
  const { uid, token } = useParams();
  console.log(uid, token);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Basic check before calling backend
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!uid || !token) {
      setError("Invalid reset link.");
      return;
    }

    try {
      const res = await resetUserPassword({
        actualData: { password: newPassword, confirm_password: confirmPassword },
        uid,
        token,
      }).unwrap();

      setMessage(res.msg || "Password reset successful! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.error("Reset error:", err);
      const e = err?.data?.errors?.non_field_errors?.[0];
      setError(e || "Failed to reset password. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-[#121212] border border-[#33353F] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Reset Your Password
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {message && <p className="text-green-400 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="bg-[#18191E] border border-[#33353F] text-white rounded block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-[#18191E] border border-[#33353F] text-white rounded block w-full p-2.5"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white rounded ${
              isLoading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPin;
