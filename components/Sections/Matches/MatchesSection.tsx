import React, { useState } from 'react'
import MatchesList from './MatchesList';
import { Search, X } from 'lucide-react';

export default function MatchesSection() {
    const today = new Date();
    const defaultDate = today.toISOString().split('T')[0];
    const [state, setState] = useState(0)
    const [stateSearch, setStateSearch] = useState(false)
    const [search, setSearch] = useState('')
    const [date, setDate] = useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)

    const handleDate = (date: string) => {
        setDate(date)
    }

    const handleStateSearch = () => {
        setStateSearch(!stateSearch)
    }

    const handleSearch = (value: string) => {
        setSearch(value)
    }

    const tabs = [
        { label: 'Todos', stateValue: 0 },
        { label: 'En Vivo', stateValue: 1 },
        { label: 'Próximos', stateValue: 2 },
        { label: 'Finalizados', stateValue: 3 },
    ];
    const baseClasses = 'text-gray-300 transition-all duration-150 cursor-pointer py-1 px-2 rounded-md hover:text-white';

    return (
        <section className='w-full bg-projectGrays-500 rounded-lg mt-2 p-2'>
            <nav className='border-b flex justify-between items-center border-projectGrays-300 px-1 py-2'>
                <div className='flex items-center gap-2'>
                    <div className={`group flex items-center gap-1`}>
                        <button onClick={() => handleStateSearch()} className='hover:bg-projectGrays-700 z-10 transition-all duration-150 py-1 px-2 rounded-lg'>{stateSearch ? <X size={21} strokeWidth={3} />  : <Search size={21} strokeWidth={3} />}</button>
                        <input onChange={(e) => handleSearch(e.target.value)} placeholder='Buscar equipo' type="text" className={`bg-projectGrays-700 ${stateSearch ? 'opacity-100 relative' : 'opacity-0 absolute'} transition-all duration-200 border-none rounded-lg z-0 text-white outline-none px-2 py-1 placeholder:text-sm placeholder:font-semibold placeholder:text-projectGrays-100`} />
                    </div>
                    <ul className={`${stateSearch ? 'hidden' : 'flex'} z-10 items-center gap-2 text-sm font-semibold justify-start`}>
                        {tabs.map(({ label, stateValue }) => (
                            <li
                                key={stateValue}
                                onClick={() => setState(stateValue)}
                                className={`${baseClasses} ${state === stateValue && "bg-projectGrays-700 text-white"}`}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`relative ${state == 1 && 'hidden'}`}>

                    <input defaultValue={defaultDate} onChange={(e) => handleDate(e.currentTarget.value)} className="bg-projectGrays-700 outline-none rounded-md p-1 text-xs font-semibold w-full" type="date" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-2 z-10 top-1/2 w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </nav>
            <MatchesList
                date={date}
                status={state}
                search={search}
            />
        </section>
    )
}
