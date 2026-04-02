import Link from 'next/link'
import React from 'react'
import { BiFootball } from 'react-icons/bi'

export default function MainNav() {
  return (
    <nav className='w-full fixed z-[100] bg-projectGrays-500 p-4 flex flex-col gap-2 items-center justify-evenly mb-8'>
        <div>
            <Link href='/' className='p-1 font-bold text-lg flex items-center'><span className='bg-blue-500 flex gap-1 items-center p-1 rounded-lg mr-2'><BiFootball />Football</span>Training Project</Link>
        </div>
    </nav>
  )
}
