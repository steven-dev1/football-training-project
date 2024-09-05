import React from 'react'

interface StatusTagProps {
    status: string, 
    isLive: boolean, 
    time: string,
}

export default function StatusTag({ status, isLive, time}: StatusTagProps ) {
    const liveStatus = !Number(status) && isLive ? status : "Min "+status+"'"
    const isFinished = status !== ""
    const TagClasses = {
        on: 'bg-red-700 text-nowrap w-full animate-pulse font-semibold text-white p-1 rounded-lg text-xs text-center whitespace-nowrap text-ellipsis overflow-hidden',
        off: "text-xs text-projectGrays-100 w-full font-semibold text-nowrap text-center text-ellipsis overflow-hidden whitespace-nowrap"
    }
    return (
        <p className={isLive ? TagClasses.on : TagClasses.off}>
            {isLive ? liveStatus : (isFinished ? status : time)}
        </p>
    )
}
