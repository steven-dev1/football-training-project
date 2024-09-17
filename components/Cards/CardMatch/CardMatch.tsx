'use client'
import LogoItem from "@/components/Teams/LogoItem";
import { MatchStatus } from "./MatchStatus";
import { ItemInfo, MatchInfo } from "@/types/GameData";
import StatusTag from "./StatusTag";
import { BsStar, BsStarFill } from "react-icons/bs";
import { convertTimeToLocal, formatDate } from "@/infrastructure/utils/helpers";
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addFavorite, listFavorites, removeFavorite } from "@/redux/features/favoritesSlice";
import { handleAddFavorite } from "@/infrastructure/utils/fetchers";

interface MatchProps {
  matchInfo: MatchInfo,
  teamHome: ItemInfo,
  teamAway: ItemInfo,
  orientation: 'vertical' | 'horizontal'
}

export const CardMatch = ({ matchInfo, teamHome, teamAway, orientation }: MatchProps) => {
  const [favorite, setFavorite] = useState(false);
  const favorites = useAppSelector((state) => state.favoriteStates.favorites);
  const dispatch = useAppDispatch();
  const sessionId = localStorage.getItem('sessionId') || '';

  useEffect(() => {
    setFavorite(favorites.includes(matchInfo.id));
  }, [favorites]);

  const handleFavoriteToggle = async () => {
    if (favorite) {
      dispatch(removeFavorite(matchInfo.id));
    } else {
      try {
        const response = await handleAddFavorite(matchInfo.id, sessionId);
        if(response) {
          dispatch(addFavorite(matchInfo.id));
        }
      } catch (err) {
        console.error('Error toggling favorite:', err);
      }
    }
  };

  const isHorizontal = orientation === 'horizontal';
  const localTime = convertTimeToLocal(matchInfo.time, 'America/Bogota');
  const status = matchInfo.status === 'Finished' ? 'Finalizado' : matchInfo.status === 'Postponed' ? 'Pospuesto' : matchInfo.status;

  return (
    <article className={`relative group rounded-lg w-full cursor-pointer ${isHorizontal ? 'flex items-center gap-2 justify-between bg-projectGrays-500 px-3 py-2' : 'flex flex-col items-center border border-projectGrays-300 p-3 gap-4'}`}>
      {isHorizontal ? (
        <>
          <div className="w-[13%] max-w-[13%]"><StatusTag isLive={matchInfo.live === '1'} status={status} time={localTime} /></div>
          <div className="text-projectGrays-100">|</div>
        </>
      ) : (
        <span className="font-medium text-xs text-projectGrays-100 text-center">{matchInfo.league}</span>
      )}

      <div className={`w-full flex justify-evenly ${isHorizontal ? 'items-center' : 'items-start gap-6'}`}>
        <div className={`${isHorizontal ? 'w-[25%] justify-end' : ''}`}><LogoItem {...teamHome} orientation={orientation} logoPosition="right" /></div>
        <div className="flex flex-col items-center w-[30%]"><MatchStatus matchInfo={matchInfo} scoreHome={teamHome.score ?? '-'} scoreAway={teamAway.score ?? '-'} formattedDate={formatDate(matchInfo.date)} localTime={localTime} orientation={orientation} /></div>
        <div className={`${isHorizontal ? 'w-[25%] justify-start' : ''}`}><LogoItem {...teamAway} orientation={orientation} logoPosition="left" /></div>
      </div>
      <div className={`${isHorizontal ? 'flex items-center' : 'absolute top-0 right-0'} ${favorite ? '': 'opacity-0 group-hover:opacity-100'}`}>
        <button onClick={handleFavoriteToggle} className="p-2">
          {favorite ? <BsStarFill /> : <BsStar />}
        </button>
      </div>
    </article>
  );
};

