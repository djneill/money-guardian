'use client';
import React, { useState } from 'react';
import { signOut } from '@/../../actions/auth';

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const handleLogout = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        await signOut();
        setLoading(false);
    };

    return (
        <div className='bg-red text-white text-preset-4 px-4 py-2 rounded-lg cursor-pointer'>
            <form onSubmit={handleLogout} action="">
                <button type='submit' disabled={loading}>
                    {loading ? 'Signing out...' : 'Sign Out'}
                </button>
            </form>
        </div>
    );
};