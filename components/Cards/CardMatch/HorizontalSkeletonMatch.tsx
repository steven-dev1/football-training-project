import React from 'react'

export default function HorizontalSkeletonMatch() {
    return (
        <div className='bg-projectGrays-700 rounded-lg p-4'>
            <div className='w-[200px] h-4 rounded-full bg-projectGrays-100 animate-pulse'></div>
            <hr className='animate-pulse border-projectGrays-300 mt-2'/>
            {[...Array(5)].map((_, index) => (
                <article key={index} className="relative group rounded-lg w-full cursor-pointer flex items-center gap-2 justify-between px-3 py-2 animate-pulse">
                    {/* StatusTag Skeleton */}
                    <div className="w-[13%] max-w-[13%] bg-gray-300 h-6 rounded"></div>

                    {/* Divider */}
                    <div className="text-projectGrays-100">|</div>

                    {/* Main content skeleton */}
                    <div className="w-full flex justify-evenly items-center">
                        {/* Home Team Logo Skeleton */}
                        <div className="w-[25%] justify-end">
                            <div className="bg-gray-300 h-10 w-10 rounded-full"></div>
                        </div>

                        {/* Match Status Skeleton */}
                        <div className="flex flex-col items-center w-[30%]">
                            <div className="bg-gray-300 h-4 w-16 rounded mb-1"></div>
                            <div className="bg-gray-300 h-4 w-10 rounded"></div>
                        </div>

                        {/* Away Team Logo Skeleton */}
                        <div className="w-[25%] justify-end">
                            <div className="bg-gray-300 h-10 w-10 rounded-full"></div>
                        </div>
                    </div>

                    {/* Favorite button skeleton */}
                    <div className="flex items-center animate-pulse">
                        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
                    </div>
                </article>))}
        </div>
    )
}
