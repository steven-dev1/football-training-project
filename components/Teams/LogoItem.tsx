import Image from 'next/image'
import React from 'react'
import { Team } from '@/types/GameData'

export default function LogoItem({ srcLogo, name, orientation }: Team) {
  return (
    orientation == "vertical" ?
      <div className='flex flex-col items-center max-w-[80px]'>
        <Image src={srcLogo} alt={name} width={70} height={70} />
        <p className='font-semibold max-w-[80px] mt-2 text-sm text-center whitespace-nowrap leading-3 overflow-hidden text-ellipsis'>
          {name}
        </p>
      </div>
      :
      <div className='flex gap-1 items-center'>
        <Image src={srcLogo} alt={name} width={20} height={20} />
        <p className='font-semibold text-sm text-center whitespace-nowrap leading-4 overflow-hidden text-ellipsis'>
          {name}
        </p>
      </div>
  )
}
