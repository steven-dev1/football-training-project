import React from 'react'
import { RemappedDataType } from '@/types/GameData'
import { formatDate, convertTimeToLocal } from '@/utils/helpers'
import { MatchHorizontal } from './MatchHorizontal';
import { MatchVertical } from './MatchVertical';

export default function CardMatch({ matchInfo, teamHome, teamAway, orientation }: RemappedDataType) {
  const dateStr = matchInfo.date;
  const formattedDate = formatDate(dateStr);
  const localTime = convertTimeToLocal(matchInfo.time, 'America/Bogota');

  if (matchInfo.status === 'Finished') {
    matchInfo.status = 'Finalizado';
  }

  return orientation === "vertical" ? (
    <MatchVertical 
      matchInfo={matchInfo} 
      teamHome={teamHome} 
      teamAway={teamAway} 
      formattedDate={formattedDate} 
      localTime={localTime} 
    />
  ) : (
    <MatchHorizontal 
      matchInfo={matchInfo} 
      teamHome={teamHome} 
      teamAway={teamAway} 
      localTime={localTime} 
    />
  );
}
