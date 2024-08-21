
import Link from 'next/link';
import React from 'react'

interface SimpleButtonProps {
    link: string;
    label: string;
}

export default function SimpleButton({ link, label }: SimpleButtonProps) {
  return (
    <Link href={link} className='p-2 rounded-lg font-medium bg-[#131313] text-white m-1 hover:bg-[#0a0a0a] transition-all duration-100'>{label}</Link>
  )
}
