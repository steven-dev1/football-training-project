import React from 'react'
import LogoItem from '../Teams/LogoItem'
import {  Match } from '@/types/GameData'

export default function CardFinished({ matchInfo, teamHome, teamAway, orientation }: Match) {

  return (
    <article className='rounded-lg min-w-[350px] max-w-[400px] border-[#2C2C2C] border-[3px] m-2 p-5 gap-2 flex flex-col items-center'>
      <span className='font-medium text-[#878787] text-sm'>{matchInfo.league}</span>
      <div className='w-full flex justify-center items-start gap-6'>
        <LogoItem
          srcLogo={teamHome.srcLogo}
          name={teamHome.name}
          orientation={orientation}
        />
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl font-bold'>{teamHome.score} {!teamHome.score && !teamAway.score ? 'vs' : '-'} {teamAway.score}</h1>
          <p className='text-sm font-semibold'>{matchInfo?.status == 'Finished' ? 'Finalizado' : matchInfo.status}</p>
          <span className='text-sm text-[#878787] font-medium text-nowrap text-ellipsis overflow-hidden'>
            {matchInfo.date}
          </span>
        </div>
        <LogoItem
          srcLogo={teamAway.srcLogo}
          name={teamAway.name}
          orientation={orientation}
        />
      </div>
    </article>
  )
}
