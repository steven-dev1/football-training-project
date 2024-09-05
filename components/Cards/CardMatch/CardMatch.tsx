import LogoItem from "@/components/Teams/LogoItem";
import { MatchStatus } from "./MatchStatus";
import { ItemInfo, MatchInfo } from "@/types/GameData";
import StatusTag from "./StatusTag";
import { BsStar, BsStarFill } from "react-icons/bs";
import { convertTimeToLocal, formatDate } from "@/infrastructure/utils/helpers";

interface MatchProps { 
  matchInfo: MatchInfo, 
  teamHome: ItemInfo, 
  teamAway: ItemInfo, 
  orientation: 'vertical' | 'horizontal' 
}

export const CardMatch = ({ matchInfo, teamHome, teamAway, orientation }: MatchProps) => {
  const isHorizontal = orientation === 'horizontal';
  const isLive = matchInfo.live === '1';
  const formattedDate = formatDate(matchInfo.date);
  const localTime = convertTimeToLocal(matchInfo.time, 'America/Bogota');
  matchInfo.status = matchInfo.status === 'Finished' ? 'Finalizado' : matchInfo.status === 'Postponed' ? 'Pospuesto' : matchInfo.status;

  return (
    <article className={`rounded-lg w-full cursor-pointer ${isHorizontal ? 'flex items-center gap-2 justify-between group hover:bg-projectGrays-300 bg-projectGrays-500 px-3 py-2' : 'flex flex-col items-center hover:bg-projectGrays-300/40 border-[1px] border-projectGrays-300 p-3 gap-4'}`}>
      {isHorizontal ? (
        <>
          <div className='max-w-[13%] min-w-[13%]'><StatusTag isLive={isLive} status={matchInfo.status} time={localTime} /></div>
          <div className='text-projectGrays-100'>|</div>
        </>
      ) : (
        <span className='font-medium text-projectGrays-100 w-full text-center text-xs whitespace-nowrap overflow-hidden text-ellipsis'>{matchInfo.league}</span>
      )}
      
      <div className={`w-full flex justify-evenly ${isHorizontal ? 'items-center' : 'items-start gap-6'}`}>
        <div className={`${isHorizontal ? 'w-[25%] justify-end' : ''}`}>
          <LogoItem {...teamHome} orientation={orientation} logoPosition="right" />
        </div>
        <div className='flex flex-col items-center w-[30%]'>
          <MatchStatus matchInfo={matchInfo} scoreHome={teamHome.score ?? '-'} scoreAway={teamAway.score ?? '-'} formattedDate={formattedDate} localTime={localTime} orientation={orientation} />
        </div>
        <div className={`${isHorizontal ? 'w-[25%] justify-start' : ''}`}>
          <LogoItem {...teamAway} orientation={orientation} logoPosition="left" />
        </div>
      </div>

      {isHorizontal && (
        <div className="relative">
          <button className="opacity-0 p-2 group-hover:opacity-100"><BsStar /></button>
          <div className="absolute p-2 top-0 left-0 opacity-0 hover:opacity-100"><BsStarFill /></div>
        </div>
      )}
    </article>
  );
};