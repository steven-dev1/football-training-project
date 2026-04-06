import { CircleXIcon } from 'lucide-react';
import React from 'react'

export default function LoadingError({children}: {children: React.ReactNode}) {
  return (
    <div className="w-full text-center p-2 flex flex-col gap-2 items-center justify-center"><CircleXIcon size={60} color='gray'/>{children}</div>
  )
}
