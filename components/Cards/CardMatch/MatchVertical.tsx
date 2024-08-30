import LogoItem from "@/components/Teams/LogoItem";
import { MatchStatus } from "./MatchStatus";
import { ItemInfo, MatchInfo } from "@/types/GameData";

type MatchVerticalProps = {
    matchInfo: MatchInfo
    teamHome: ItemInfo
    teamAway: ItemInfo
    formattedDate: string;
    localTime: string;
  };

export const MatchVertical = ({ matchInfo, teamHome, teamAway, formattedDate, localTime }: MatchVerticalProps) => {
    return (
      <article className='rounded-lg w-full hover:bg-projectGrays-300/40 cursor-pointer border-projectGrays-300 border-[1px] p-3 gap-4 flex flex-col items-center'>
        <span className='font-medium text-projectGrays-100 text-xs'>{matchInfo.league}</span>
        <div className='w-full flex justify-evenly items-start gap-6'>
          <LogoItem
            id={teamHome.id}
            srcLogo={teamHome.srcLogo}
            name={teamHome.name}
            orientation="vertical"
          />
          <MatchStatus
            matchInfo={matchInfo}
            scoreHome={teamHome.score ?? '-'}
            scoreAway={teamAway.score ?? '-'}
            formattedDate={formattedDate}
            localTime={localTime}
            orientation="vertical"
          />
          <LogoItem
            id={teamAway.id}
            srcLogo={teamAway.srcLogo}
            name={teamAway.name}
            orientation="vertical"
          />
        </div>
      </article>
    );
  };