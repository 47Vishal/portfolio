// app/resetpin/page.jsx
'use client';
import React from 'react';
import Navbar from '../components/Navbar';  // adjust path
import Footer from '../components/Footer';
import PinLink from '../components/Auth/PinLink';  // adjust path

const ResetPinPage = () => (
    <main className="flex flex-col bg-[#121212]">
        <Navbar />
        <div className=" min-h-screen container mt-24 mx-auto max-w-sm">
            <PinLink />
        </div>
        <Footer />
    </main>
);

export default ResetPinPage;
