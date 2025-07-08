"use client";

import React, { useState, useEffect } from "react";
import { useUserLogInMutation } from "@/services/userAuthAPI";
import { useDispatch } from "react-redux";
import { setUserToken } from "@/features/authSlice";
import { LocalStoreToken, getToken } from "../../../services/LocalStoreService";
import Link from "next/link";

const LoginForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useUserLogInMutation();
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Feedback states
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    try {
      const res = await loginUser({ email, password }).unwrap();
      // console.log(res);
      // Save token to localStorage
      LocalStoreToken(res.token); // assumes token object has { access, refresh }
      // Set token in Redux
      if (res.token?.access) {
        dispatch(setUserToken({ access_token: res.token.access }));
      }
      // Show success message
      setSuccessMessage(res.msg);
      // console.log(res.msg);
      document.getElementById('LogIn_Form_Submit').reset();
      // Optionally close modal
      if (handleClose) handleClose();

    } catch (err) {
      // If backend returns validation error format
      if (err?.data.errors) {
        setErrors(err.data.errors);
      } else {
        setErrors({ detail: "Login failed. Please try again." });
      }
    }
  };

  // Clear success and error messages automatically
  useEffect(() => {
    if (successMessage || errors) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errors]);


  useEffect(() => {
    if (errors.non_field_errors) {
      const timer = setTimeout(() => {
        setErrors(prev => ({ ...prev, non_field_errors: null }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors.non_field_errors]);


  return (
    <form id='LogIn_Form_Submit' className="flex flex-col" onSubmit={handleLogin}>
      <div className="mb-4">

        <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
          Your Email
        </label>
        <input
          name="email"
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5"
          placeholder="your@email.com"
        />
        {errors?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="text-white block mb-2 text-sm font-medium">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5"
          placeholder="Enter your password"
        />
        {errors?.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
        )}
      </div>
      {errors.non_field_errors && (
        <p className="text-sm text-red-400">{errors.non_field_errors[0]}</p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#8B5CF6] hover:bg-purple-700 text-white font-medium py-2.5 px-5 rounded-lg w-full"
      >
        {isLoading ? "Logging in..." : "Log In"}
      </button>
      <div className="mt-4 text-center text-sm">
        <p>
          <Link href="/reset" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>

        </p>
      </div>
      {/* ✅ Backend detail message or global error */}
      {errors?.detail && (
        <p className="text-red-500 mt-3 text-center">{errors.detail}</p>
      )}
      {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}

      {/* ✅ Success message */}
      {successMessage && (
        <p className="text-green-500 mt-3 text-center">{successMessage}</p>
      )}
    </form>
  );
};

export default LoginForm;
