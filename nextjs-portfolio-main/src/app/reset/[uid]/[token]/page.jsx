// app/resetpin/page.jsx
'use client';
import React from 'react';
import Navbar from '../../../components/Navbar';  // adjust path
import Footer from '../../../components/Footer';
import ResetPin from '../../../components/Auth/reset';  // adjust path

const ResetPinPage = () => (
    <main className="flex flex-col bg-[#121212]">
        <Navbar />
        <div className="container mt-24 mx-auto">
            <ResetPin />
        </div>
        <Footer />
    </main>
);

export default ResetPinPage;
