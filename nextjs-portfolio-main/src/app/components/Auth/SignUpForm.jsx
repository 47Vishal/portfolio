'use client';
import React, { useState, useEffect } from 'react';
import { useRegisterUserMutation } from '@/services/userAuthAPI';
import { useDispatch } from 'react-redux';


const SignUpForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    First_name: '',
    Last_Name: '',
    email: '',
    password: '',
    confirm_password: '',
    Term: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');



  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errors.non_field_errors) {
      const timer = setTimeout(() => {
        setErrors(prev => ({ ...prev, non_field_errors: null }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors.non_field_errors]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  // const{value, error, handleChange, handleSubmit}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');



    // Add hcaptcha token to the payload sent to backend
    const payload = { ...formData };

    try {
      const response = await registerUser(payload);
      console.log(response); 
      // if (response.data && response.data.status ==="success") 

      if (response.data ) {
        setSuccessMessage(response.data.msg);
        document.getElementById('SignUp_Form_Submit').reset();
        if (onSubmit) onSubmit(response.data);
      } else if (response?.error?.data?.errors) {
        setErrors(response.error.data.errors);
      } else {
        setErrors({ apiError: 'An unknown error occurred.' });
      }
    } catch (response) {
      console.error("Unexpected error:", response);
      setErrors({ apiError: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <form id='SignUp_Form_Submit'className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="First_name" className="text-white block mb-2 text-sm font-medium">First Name</label>
          <input
            type="text"
            name="First_name"
            value={formData.First_name}
            onChange={handleChange}
            placeholder="John"
            className={`bg-[#18191E] border ${errors.First_name ? 'border-red-500' : 'border-[#33353F]'} placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5`}
          />
          {errors.First_name && <p className="text-sm text-red-400">{errors.First_name}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="Last_Name" className="text-white block mb-2 text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="Last_Name"
            value={formData.Last_Name}
            onChange={handleChange}
            placeholder="Doe"
            className={`bg-[#18191E] border ${errors.Last_Name ? 'border-red-500' : 'border-[#33353F]'} placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5`}
          />
          {errors.Last_Name && <p className="text-sm text-red-400">{errors.Last_Name}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={`bg-[#18191E] border ${errors.email ? 'border-red-500' : 'border-[#33353F]'} placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5`}
        />
        {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="text-white block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder="••••••••"
          className={`bg-[#18191E] border ${errors.confirm_password ? 'border-red-500' : 'border-[#33353F]'} placeholder-[#9CA2A9] text-white text-sm rounded-lg block w-full p-2.5`}
        />
        {errors.confirm_password && <p className="text-sm text-red-400">{errors.confirm_password}</p>}
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center text-white text-sm">
        <input
          type="checkbox"
          name="Term"
          checked={formData.Term}
          onChange={handleChange}
          className="mr-2 accent-purple-600"
        />
        <span>
          I agree to the{" "}
          <a href="#" className="underline text-purple-400 hover:text-purple-500">terms and conditions</a>
        </span>
        {errors.Term && <p className="text-sm text-red-400 ml-2">{errors.Term}</p>}
      </div>



      {/* Success & Error Messages */}
      {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}
      {errors.non_field_errors && (
        <p className="text-sm text-red-400">{errors.non_field_errors[0]}</p>
      )}
      {errors.apiError && (
        <p className="text-sm text-red-400">{errors.apiError}</p>
      )}


      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-5 rounded-lg w-full"
      >
        {isLoading ? 'Registering...' : 'Sign Up'}
      </button>
      
    </form>
  );
};

export default SignUpForm;
