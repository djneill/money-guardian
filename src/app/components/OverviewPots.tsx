import React from 'react'
import Link from 'next/link'
import CaretRight from '../icons/CaretRight'
import Pots from '../icons/PotsIcon'
import data from '@/app/data/data.json'
import { currencyFormat } from '@/utils/currencyFormatter'

export default function OverviewPots() {
    const totalSavings = data.pots.reduce((sum, pot) => sum += pot.total, 0)
    return (
        <div className='flex flex-col w-full h-80 rounded-lg bg-white my-8 px-5 py-6'>
            <div className=" flex flex-row justify-between">
                <p className='text-black text-preset-2'>Pots</p>
                <Link className='flex flex-row  items-center' href={'/pots'} aria-label='See Details Pots'>
                    <p className='text-preset-4 text-gray-500 mr-4'>See Details</p>
                    <CaretRight />
                </Link>
            </div>

            <div className='flex items-center my-5 bg-beige-100 h-28 rounded-lg p-4'>
                <div className=''>
                    <Pots className='stroke-green h-10 w-10' />
                </div>
                <div className="px-4">
                    <p className='text-preset-4 text-gray-500 pb-3'>Total Saved</p>
                    <p className='text-preset-1 text-grey-900'>{currencyFormat(totalSavings)}</p>
                </div>
            </div>

            <div className='grid grid-cols-2 mt-5 gap-4'>
                <div className='border-l-green border-l-4 px-4 rounded-sm'>
                    <p className='text-preset-5 text-grey-500'>{data.pots[0].name}</p>
                    <p className="text-preset-4-bold text-grey-900">{currencyFormat(data.pots[0].total)}</p>
                </div>

                <div className='border-l-cyan border-l-4 px-4 rounded-sm'>
                    <p className='text-preset-5 text-grey-500'>{data.pots[1].name}</p>
                    <p className="text-preset-4-bold text-grey-900">{currencyFormat(data.pots[1].total)}</p>
                </div>

                <div className='border-l-navy border-l-4 px-4 rounded-sm'>
                    <p className='text-preset-5 text-grey-500'>{data.pots[2].name}</p>
                    <p className="text-preset-4-bold text-grey-900">{currencyFormat(data.pots[2].total)}</p>
                </div>

                <div className='border-l-yellow border-l-4 px-4 rounded-sm'>
                    <p className='text-preset-5 text-grey-500'>{data.pots[3].name}</p>
                    <p className="text-preset-4-bold text-grey-900">{currencyFormat(data.pots[3].total)}</p>
                </div>
            </div>
        </div>
    )
}
