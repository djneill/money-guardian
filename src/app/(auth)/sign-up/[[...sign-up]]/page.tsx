import { SignUp } from '@clerk/nextjs'
import TitleBar from '@/app/components/TitleBar'
import AuthImage from '@/app/components/AuthImage'

export default function Login() {
    return (
        <main className='flex flex-col w-full min-h-screen'>
            <div className='lg:hidden'>
                <TitleBar />
            </div>

            <div className='flex flex-col lg:flex-row h-screen'>
                <div className='hidden lg:flex lg:w-1/2 relative overflow-hidden bg-grey-900 m-2 rounded-xl'>
                    <div className='absolute inset-0 flex flex-col justify-between p-8 text-white z-10'>
                        <p className='font-sans text-preset-1'>Money Guardian</p>
                        <div>
                            <h2 className='font-sans text-preset-1 mb-4'>Keep track of your money and save for your future</h2>
                            <p className='font-sans text-preset-4'>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
                        </div>
                    </div>
                    <AuthImage
                        width={560}
                        height={920}
                        className='object-cover w-[560px] h-full'
                    />
                </div>
                <div className='flex w-full lg:w-1/2 justify-center items-center h-full'>
                    <div className='m-auto'>
                        <SignUp />
                    </div>
                </div>
            </div>
        </main>
    )
}

{/* <main className='flex flex-col w-full min-h-screen'>
<div className='lg:hidden'>
    <TitleBar />
</div>

<div className='flex-grow flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-4'>
    <div className='hidden lg:block w-full h-screen m-4 overflow-hidden rounded-xl justify-self-center'>
        <p className='font-sans text-preset-1 absolute p-4 font-[1000]'>Money Guardian finance</p>
        <p className='font-sans text-preset-1 absolute  bottom-20 text-wrap max-w-[560px]'>Keep track of your money
            and save for your future</p>
        <p className='text-preset-4 bottom-10 relative z-10 max-w-[560px]'>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
        <img src="/assets/images/image.png" alt="" className='rounded-xl 2-[560px] h-[920px]' />
        {/* <AuthImage
            width={560}
            height={920}
        /> */}
//     </div >
//     <div className='flex w-full justify-center mx-auto'>
//         <SignUp />
//     </div>
// </div >
// </main > */}