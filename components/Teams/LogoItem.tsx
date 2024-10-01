import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ItemInfo } from '@/types/GameData'

interface LogoItemProps extends ItemInfo {
  logoPosition?: 'right' | 'left';
}

export default function LogoItem({ srcLogo, name, orientation, logoPosition }: LogoItemProps) {
  const [error, setError] = useState(false)
  const isVertical = orientation == 'vertical'
  const fallbackImage = '/no-image.svg'
  const validSrcLogo = srcLogo || fallbackImage;

  const containerClasses = {
    vertical: 'flex flex-col items-center min-w-[70px] max-w-[70px] cursor-pointer',
    horizontal: `flex gap-2 items-center ${logoPosition == 'right' ? 'justify-end' : 'justify-start'} cursor-pointer max-w-auto`
  }
  const verticalExtraParagraphClass = "max-w-[80px] mt-2 leading-3"

  const bodyContent = [
    <Image key={validSrcLogo} className={`${error || !srcLogo ? 'bg-white rounded-full' : ''}`} src={error ? fallbackImage : validSrcLogo} alt={name} width={isVertical ? 50 : 20} height={isVertical ? 50 : 20} onError={()=> setError(true)}/>,
    <p key={name} className={`${isVertical && verticalExtraParagraphClass} font-medium text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis`}>
      {name}
    </p>

  ]

  useEffect(() => {
    setError(false)
  },[srcLogo])

  return (
    <div className={isVertical ? containerClasses.vertical : containerClasses.horizontal}>
      {isVertical || logoPosition !== 'right' ? bodyContent : bodyContent.reverse()}
    </div>
  )
}
