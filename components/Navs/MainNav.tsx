import React from 'react'

export default function MainNav() {
  return (
    <nav className='w-screen bg-[#2C2C2C] p-3 flex flex-col gap-2 items-center justify-evenly mb-8'>
        <div>
            <h1 className='p-1 font-bold text-lg'>FootballAPI <span className='bg-blue-500 p-1 rounded-lg'>Training</span></h1>
        </div>
        <ul className='flex justify-center gap-4 font-semibold'>
            <li className='text-gray-300 cursor-pointer hover:text-white'>Partidos</li>
            <li className='text-gray-300 cursor-pointer hover:text-white'>Estadísticas</li>
            <li className='text-gray-300 cursor-pointer hover:text-white'>Competiciones</li>
        </ul>
    </nav>
  )
}
