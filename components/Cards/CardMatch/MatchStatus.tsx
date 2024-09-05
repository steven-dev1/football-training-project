import { MatchInfo } from "@/types/GameData";
import StatusTag from "./StatusTag";

type MatchStatusProps = {
  matchInfo: MatchInfo;
  scoreHome: string;
  scoreAway: string;
  formattedDate?: string;
  localTime: string;
  orientation: "vertical" | "horizontal";
};

export const MatchStatus = ({ matchInfo, scoreHome, scoreAway, formattedDate, localTime, orientation }: MatchStatusProps) => {
  const isLive = matchInfo.live === "1";
  const isFinished = matchInfo.status === 'Finalizado' || matchInfo.status !== '';
  const isHorizontal = orientation === "horizontal";

  const Score = () => (
    <h1 className={`font-bold text-nowrap text-center ${isHorizontal ? 'text-2xl' : isFinished ? 'text-3xl' : 'text-4xl'}`}>
      {isFinished || isLive ? `${scoreHome} - ${scoreAway}` : 'vs'}
    </h1>
  );

  const Status = () => (
    !isHorizontal && (
      <StatusTag isLive={isLive} status={matchInfo.status} time={localTime} />
    )
  );

  return (
    <div className={`flex flex-col items-center ${isHorizontal ? 'w-full' : 'max-w-[70px]'}`}>
      <Score />
      <Status />
      {!isLive && !isHorizontal && <p className='text-xs text-projectGrays-100 font-medium text-nowrap text-ellipsis overflow-hidden'>
        {formattedDate}
      </p>}
    </div>
  );
};
