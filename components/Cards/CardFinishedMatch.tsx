import React from 'react'
import LogoItem from '../Teams/LogoItem'
import { RemappedDataType } from '@/types/GameData'
import { formatDate, convertTimeToLocal } from '@/utils/helpers'

export default function CardFinished({ matchInfo, teamHome, teamAway, orientation }: RemappedDataType) {
  const dateStr = matchInfo.date;
  const formattedDate = formatDate(dateStr);
  const localTime = convertTimeToLocal(matchInfo.time, 'America/Bogota');
  return (
    <article className='rounded-lg w-[290px] border-projectGrays-300 border-[3px] p-3 gap-2 flex flex-col items-center'>
      <span className='font-medium text-projectGrays-100 text-xs'>{matchInfo.league}</span>
      <div className='w-full flex justify-center items-start gap-6'>
        <LogoItem
          srcLogo={teamHome.srcLogo}
          name={teamHome.name}
          orientation={orientation}
        />

        {matchInfo?.status == 'Finished' ?
          <div className='flex flex-col items-center max-w-[70px]'>
            <h1 className='text-3xl font-bold'>{teamHome.score} - {teamAway.score}</h1>
            <p className='text-xs font-semibold text-nowrap text-ellipsis overflow-hidden'>{matchInfo?.status == 'Finished' ? 'Finalizado' : matchInfo.status}</p>
            <span className='text-xs text-projectGrays-100 font-semibold text-nowrap text-ellipsis overflow-hidden'>
              {formattedDate}
            </span>
          </div>
          :
          <div className='flex flex-col items-center max-w-[70px]'>
            <h1 className='text-4xl font-bold'>vs</h1>
            <p className='text-xs font-semibold text-nowrap text-ellipsis overflow-hidden w-[100px]'>{formattedDate}</p>
            <span className='text-xs text-projectGrays-100 font-semibold text-nowrap text-ellipsis overflow-hidden'>
              {localTime}
            </span>
          </div>}
        <LogoItem
          srcLogo={teamAway.srcLogo}
          name={teamAway.name}
          orientation={orientation}
        />
      </div>
    </article>
  )
}
