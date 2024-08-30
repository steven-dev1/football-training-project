import LogoItem from "@/components/Teams/LogoItem";
import { ItemInfo, MatchInfo } from "@/types/GameData";

type MatchHorizontalProps = {
    matchInfo: MatchInfo
    teamHome: ItemInfo
    teamAway: ItemInfo
    localTime: string;
};

export const MatchHorizontal = ({ matchInfo, teamHome, teamAway, localTime }: MatchHorizontalProps) => {
    return (
        <article className='rounded-lg w-full cursor-pointer hover:bg-projectGrays-300 bg-projectGrays-500 px-3 py-2 gap-2 flex justify-between items-center'>
            <div className='w-[13%]'>
                <p className={`${matchInfo?.live == "1" && 'bg-red-700 animate-pulse text-white p-1 rounded-lg text-center'} text-xs text-projectGrays-100 font-semibold text-nowrap text-ellipsis overflow-hidden`}>
                    {matchInfo?.status !== '' ? matchInfo.status : localTime}
                </p>
            </div>
            <div className='text-projectGrays-100'>|</div>
            <div className='w-full flex justify-between items-center'>
                <div className='w-[25%]'>
                    <LogoItem
                        id={teamHome.id}
                        srcLogo={teamHome.srcLogo}
                        name={teamHome.name}
                        orientation="horizontal"
                    />
                </div>
                <div className='flex flex-col items-center w-[25%]'>
                    {matchInfo?.status !== '' ? (
                        <h1 className='text-3xl font-bold'>{teamHome.score} - {teamAway.score}</h1>
                    ) : (
                        <h1 className='text-4xl font-bold'>vs</h1>
                    )}
                </div>
                <div className='w-[25%]'>
                    <LogoItem
                        id={teamAway.id}
                        srcLogo={teamAway.srcLogo}
                        name={teamAway.name}
                        orientation="horizontal"
                    />
                </div>
            </div>
        </article>
    );
};
