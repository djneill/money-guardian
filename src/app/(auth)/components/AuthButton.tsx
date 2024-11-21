import React from 'react'

export default function AuthButton({ type, loading }: { type: 'login' | 'signup', loading: boolean }) {
    return (
        <button
            disabled={loading}
            type='submit'
            className={`${loading ? 'bg-gray-300' : 'bg-blue'} rounded-md w-full px-12 py-3 text-preset-4 text-white`}>
            {loading ? 'Loading...' : type === 'login' ? 'Sign in' : 'Sign up'}
        </button>
    )
}
