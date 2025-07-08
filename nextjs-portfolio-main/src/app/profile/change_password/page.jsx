// app/resetpin/page.jsx
'use client';
import React from 'react';

import ChangePin from '../../components/Auth/ChangePin';  // adjust path

const change_password = () => (
    <main className="flex flex-col bg-[#121212]">
            <ChangePin />
    </main>
);

export default change_password;