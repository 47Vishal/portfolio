"use client";

import { useState } from "react";
import { useResetUserPasswordMutation } from "@/services/userAuthAPI";
import { useRouter, useParams } from "next/navigation";



export default function ResetPin() {
  const { uid, token } = useParams();
  const router = useRouter();

  const [resetUserPassword, { isLoading }] = useResetUserPasswordMutation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const payload = { uid, token, actualData: { password: newPassword, confirm_password: confirmPassword } };

    const result = await resetUserPassword(payload);

    if ("data" in result) {
      setSuccessMsg(result.data.msg || "Password reset successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } else if (result.error?.data?.non_field_errors) {
      setErrorMsg(result.error.data.non_field_errors[0]);
    } else {
      setErrorMsg("Unexpected error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-80">
      <div className="bg-[#121212] border border-[#33353F] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Your Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-200">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="bg-[#18191E] border border-[#33353F] rounded-lg w-full p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-200">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-[#18191E] border border-[#33353F] rounded-lg w-full p-2.5 text-white"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
          {successMsg && <p className="text-sm text-green-400">{successMsg}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md shadow-sm text-white ${
              isLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? "Resetting…" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
