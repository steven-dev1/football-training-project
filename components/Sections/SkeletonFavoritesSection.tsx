import React from 'react'
import SkeletonMatchCard from '../Cards/SkeletonMatchFinished'

export default function SkeletonFavoritesSection() {
    return (
        <div className='w-full'>
            <div className="flex items-center gap-1 mb-2 mr-2">
                <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                <div className="bg-gray-300 h-4 w-[80px] rounded"></div>
            </div>
            <div className='grid grid-cols-2 gap-1 p-2 justify-between w-full'>
                {[...Array(4)].map((_, i) => (
                    <SkeletonMatchCard key={i} />
                ))}
            </div>
        </div>
    )
}
