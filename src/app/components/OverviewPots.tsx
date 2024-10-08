import React from 'react'
import Link from 'next/link'
import CaretRight from '../icons/CaretRight'
import Pots from '../icons/Pots'
import data from '@/app/data/data.json'
import { currencyFormat } from '@/utils/currencyFormatter'

const colors: string[] = ['bg-green', 'bg-cyan', 'bg-navy', 'bg-yellow'];

export default function OverviewPots() {
    const totalSavings = data.pots.reduce((sum, pot) => sum += pot.total, 0);
    const firstFourPots = data.pots.slice(0, 4);

    return (
        <div className='flex flex-col w-full h-80 rounded-lg bg-white mt-8 mb-3 px-5 py-6'>
            <div className=" flex flex-row justify-between">
                <p className='text-black text-preset-2'>Pots</p>
                <Link className='flex flex-row  items-center' href={'/pots'} aria-label='See Details Pots'>
                    <p className='text-preset-4 text-gray-500 mr-4'>See Details</p>
                    <CaretRight />
                </Link>
            </div>

            <div className='flex items-center my-5 bg-beige-100 h-28 rounded-lg p-4'>
                <div className=''>
                    <Pots className='fill-green w-10 h-10' />
                </div>
                <div className="px-4">
                    <p className='text-preset-4 text-gray-500 pb-3'>Total Saved</p>
                    <p className='text-preset-1 text-grey-900'>{currencyFormat(totalSavings)}</p>
                </div>
            </div>

            <div className='grid grid-cols-2 mt-5 gap-4'>
                {firstFourPots.map((pot, index) => (
                    <div key={pot.name} className='flex'>
                        <div className={`px-25 h-full rounded ${colors[index]}`} ></div>
                        <div className="flex flex-col px-4">
                            <p className="text-preset-5 text-grey-500">{pot.name}</p>
                            <p className="text-preset-4-bold text-grey-900">{currencyFormat(pot.total)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
