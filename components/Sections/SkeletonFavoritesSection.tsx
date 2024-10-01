import React from 'react'
import SkeletonMatchCard from '../Cards/CardMatch/SkeletonMatch'

export default function SkeletonFavoritesSection() {
    return (
        <div className='w-full'>
            <div className='grid grid-cols-2 gap-1 p-2 justify-between w-full'>
                {[...Array(2)].map((_, i) => (
                    <SkeletonMatchCard key={i} />
                ))}
            </div>
        </div>
    )
}
