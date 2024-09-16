import { SignUp } from '@clerk/nextjs'
import TitleBar from '@/app/components/TitleBar'
import AuthImage from '@/app/components/AuthImage'
// import Image from 'next/image'

export default function signUp() {
    return (
        <main className='flex flex-col w-full min-h-screen'>
            <div className='lg:hidden'>
                <TitleBar />
            </div>

            <div className='flex-grow flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-4'>
                <div className='hidden lg:block w-full max-w-[560px] h-[720px] overflow-hidden rounded-xl justify-self-center'>
                    <AuthImage />
                </div>
                <div className='w-full max-w-md'>
                    <SignUp />
                </div>
            </div>
        </main>
    )
}