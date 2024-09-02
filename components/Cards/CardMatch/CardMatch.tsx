import React from 'react'
import { MatchHorizontal } from './MatchHorizontal';
import { MatchVertical } from './MatchVertical';
import { convertTimeToLocal, formatDate } from '@/infrastructure/utils/helpers';
import { ItemInfo, MatchInfo } from '@/types/GameData';

interface CardMatchProps {
  matchInfo: MatchInfo;
  teamHome: ItemInfo;
  teamAway: ItemInfo;
  orientation: "horizontal" | "vertical";
}

export default function CardMatch({ matchInfo, teamHome, teamAway, orientation }: CardMatchProps) {
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
