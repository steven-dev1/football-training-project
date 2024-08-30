import React, { useCallback } from 'react'
import useSWR from 'swr'
import { RemapFunctionType, Stats } from '@/types/GameData';
import LogoItem from '../Teams/LogoItem';
import SkeletonTable from './SkeletonTable';
import { useCustomData } from '@/hooks/useCustomData';
import { HeaderTable } from './HeaderTable';

export default function StandingTable() {
    const queryParams = new URLSearchParams({
        action: 'get_standings',
        league_id: '152',
    });

    const remapFunction = useCallback((data: any) => {
        return data.map((stats: any) => ({
            country: stats.country_name,
            leagueId: stats.league_id,
            leagueName: stats.league_name,
            promotion: stats.overall_promotion,
            teamInfo: {
                id: stats.team_id,
                name: stats.team_name,
                srcLogo: stats.team_badge,
            },
            statsTeam: {
                position: stats.overall_league_position,
                payed: stats.overall_league_payed,
                wins: stats.overall_league_W,
                draws: stats.overall_league_D,
                losses: stats.overall_league_L,
                goalsFavor: stats.overall_league_GF,
                goalsAgainst: stats.overall_league_GA,
                points: stats.overall_league_PTS,
                homePosition: stats.home_league_position,
                homePayed: stats.home_league_payed,
                homeWins: stats.home_league_W,
                homeDraws: stats.home_league_D,
                homeLosses: stats.home_league_L,
                homeGoalsFavor: stats.home_league_GF,
                homeGoalsAgainst: stats.home_league_GA,
                homePoints: stats.home_league_PTS,
                awayPosition: stats.away_league_position,
                away_league_payed: stats.away_league_payed,
                awayWins: stats.away_league_W,
                awayDraws: stats.away_league_D,
                awayLosses: stats.away_league_L,
                awayGoalsFavor: stats.away_league_GF,
                awayGoalsAgainst: stats.away_league_GA,
                awayPoints: stats.away_league_PTS,
            },
            leagueRound: stats.league_round,
            stageName: stats.stage_name
        }));
    }, []);

    const { data, isLoading, isError } = useCustomData(remapFunction, queryParams);
    const sortedTeams = data?.sort((a: Stats, b: Stats): number => a.statsTeam.position - b.statsTeam.position);
    
    if (isError) return <div>Ocurrio un error al cargar la tabla!</div>
    if (isLoading) return <div><SkeletonTable /></div>

    return (
        <div className="relative w-[300px] overflow-x-auto shadow-md sm:rounded-lg m-2 p-2 bg-projectGrays-300">
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <p className='p-2 text-xs font-medium leading-4 pb-1'>{sortedTeams[0].league_name}</p>
                </div>
                <h1 className='text-center text-xl leading-3 font-bold p-2 pt-1'>Posiciones</h1>
            </div>
            <table className='w-full text-sm text-left text-white'>
                <thead>
                    <HeaderTable />
                </thead>
                <tbody>
                    {sortedTeams.map((item: Stats) => {
                        return (
                            <tr key={item.teamInfo.id} className='odd:bg-[#2C2C2C] py-2 px-1 rounded-lg'>
                                <td scope='row' className={`m-1 ml-0 pl-2 text-center ${item.statsTeam.position < 9 && 'text-green-500 rounded-full'} w-8 font-semibold whitespace-nowrap`}>{item.statsTeam.position}</td>
                                <td className='m-1 ml-0 px-4 flex items-center gap-2'>
                                    <LogoItem
                                        id={item.teamInfo.id}
                                        srcLogo={item.teamInfo.srcLogo}
                                        name={item.teamInfo.name}
                                        orientation={'horizontal'}
                                    />
                                </td>
                                <td className='m-1 ml-0 py-2 px-1 '>{item.statsTeam.points}</td>
                                <td className='m-1 ml-0 py-2 px-1 '>{item.statsTeam.payed}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
