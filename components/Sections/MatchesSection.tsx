import { useCustomData } from '@/hooks/useCustomData';
import { RemapFunctionType, RemappedDataType } from '@/types/GameData';
import React, { useCallback, useMemo, useState } from 'react'
import CardMatch from '../Cards/CardMatch/CardMatch';
import MatchesList from './MatchesList';

export default function MatchesSection() {
    const today = new Date(); //;
    const [state, setState] = useState(0)
    const [date, setDate] = useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)

    const handleDate = (date: string) => {
        setDate(date)
    }
    
    return (
        <section className='w-full bg-projectGrays-300 rounded-lg mt-2 p-2'>
            <nav className='border-b flex justify-between items-center border-projectGrays-100 px-1 py-2'>
                <ul className='flex text-sm font-semibold justify-start'>
                    <li onClick={()=> setState(0)} className={`text-gray-300 transition-all duration-150 cursor-pointer ${state == 0 && "bg-projectGrays-500 text-white"} py-1 px-2 rounded-md hover:text-white`}>Todos</li>
                    <li onClick={()=> setState(1)} className={`text-gray-300 transition-all duration-150 cursor-pointer ${state == 1 && "bg-projectGrays-500 text-white"} py-1 px-2 rounded-md hover:text-white`}>En Vivo</li>
                    <li onClick={()=> setState(2)} className={`text-gray-300 transition-all duration-150 cursor-pointer ${state == 2 && "bg-projectGrays-500 text-white"} py-1 px-2 rounded-md hover:text-white`}>Proximos</li>
                    <li onClick={()=> setState(3)} className={`text-gray-300 transition-all duration-150 cursor-pointer ${state == 3 && "bg-projectGrays-500 text-white"} py-1 px-2 rounded-md hover:text-white`}>Finalizados</li>
                </ul>
                <div className="relative">
                    <input onChange={(e)=> handleDate(e.currentTarget.value)} className="bg-projectGrays-500 outline-none rounded-md p-1 text-xs font-semibold w-full" type="date" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-2 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </nav>
            <MatchesList 
                date={date}
                status={state}
            />
        </section>
    )
}
