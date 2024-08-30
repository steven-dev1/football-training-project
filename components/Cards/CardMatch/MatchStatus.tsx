import { MatchInfo } from "@/types/GameData";

type MatchStatusProps = {
  matchInfo: MatchInfo;
  scoreHome: string;
  scoreAway: string;
  formattedDate: string;
  localTime: string;
  orientation: "vertical" | "horizontal"; // Nueva propiedad
};

export const MatchStatus = ({ matchInfo, scoreHome, scoreAway, formattedDate, localTime, orientation }: MatchStatusProps) => {
  const isLive = matchInfo.live == "1";
  const isFinished = matchInfo.status === 'Finalizado';
  const isHorizontal = orientation === "horizontal";

  return (
    <div className={`flex flex-col items-center ${isHorizontal ? 'w-full' : 'max-w-[70px]'}`}>
      {isFinished ? (
        <>
          <h1 className={`font-bold ${isHorizontal ? 'text-2xl' : 'text-3xl'}`}>
            {scoreHome} - {scoreAway}
          </h1>
          <p className='text-xs font-semibold text-nowrap text-ellipsis overflow-hidden'>
            {matchInfo.status}
          </p>
          <span className='text-xs text-projectGrays-100 font-semibold text-nowrap text-ellipsis overflow-hidden'>
            {formattedDate}
          </span>
        </>
      ) : (
        <>
          {!isLive && (
            <h1 className={`font-bold ${isHorizontal ? 'text-2xl' : 'text-4xl'}`}>vs</h1>
          )}
          {isLive && (
            <h1 className={`font-bold ${isHorizontal ? 'text-2xl' : 'text-3xl'}`}>
              {scoreHome} - {scoreAway}
            </h1>
          )}
          {!isLive && (
            <p className='text-xs font-semibold text-nowrap text-ellipsis overflow-hidden'>
              {formattedDate}
            </p>
          )}
          {!isLive && (
            <span className='text-xs text-projectGrays-100 font-semibold text-nowrap text-ellipsis overflow-hidden'>
              {localTime}
            </span>
          )}
          {isLive && (
            <p className='bg-red-700 animate-pulse font-semibold text-white p-1 rounded-lg text-xs text-center text-ellipsis overflow-hidden'>
              {matchInfo.status}
            </p>
          )}
        </>
      )}
    </div>
  );
};
