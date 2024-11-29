import React from 'react'

export default function AuthButton({ type, loading }: { type: 'login' | 'signup', loading: boolean }) {
    const buttonText = type === 'login' ? 'Login' : 'Sign Up';

    return (
        <button
            disabled={loading}
            type='submit'
            className={`${loading ? 'bg-gray-300' : 'bg-black'} rounded-md w-full px-12 py-3 text-preset-4-bold text-white shadow-lg shadow-slate-600`}>
            {loading ? 'Loading...' : buttonText}
        </button>
    )
}
