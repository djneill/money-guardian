import TitleBar from '@/app/components/TitleBar'
import AuthImage from '@/app/components/AuthImage'
import PasswordRecovery from '../components/PassRecovery';


export default function passwordRecoveryPage() {

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
                        <PasswordRecovery />
                    </div>
                </div>
            </div>
        </main>
    )
}
