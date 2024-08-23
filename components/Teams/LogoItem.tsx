import Image from 'next/image'
import React from 'react'
import { ItemInfo } from '@/types/GameData'

export default function LogoItem({ srcLogo, name, orientation }: ItemInfo) {
  return (
    orientation == "vertical" ?
      <div className='flex flex-col items-center min-w-[70px] max-w-[70px] cursor-pointer'>
        <Image src={srcLogo} alt={name} width={50} height={50} />
        <p className='font-medium max-w-[80px] mt-2 text-xs text-center whitespace-nowrap leading-3 overflow-hidden text-ellipsis'>
          {name}
        </p>
      </div>
      :
      <div className='flex gap-1 items-center cursor-pointer max-w-auto'>
        <Image src={srcLogo} alt={name} width={20} height={20} />
        <p className='font-medium text-xs text-center whitespace-nowrap leading-4 overflow-hidden text-ellipsis'>
          {name}
        </p>
      </div>
  )
}
