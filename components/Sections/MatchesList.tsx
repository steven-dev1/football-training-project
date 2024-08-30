import React, { useCallback, useMemo } from 'react'
import CardMatch from '../Cards/CardMatch/CardMatch'
import { RemapFunctionType, RemappedDataType } from '@/types/GameData'
import { useCustomData } from '@/hooks/useCustomData';
import { statusFilters } from '@/utils/helpers';

interface MatchesListProps {
    date: string;
    status: number;
}

export default function MatchesList({ date, status }: MatchesListProps) {
    const queryParams = useMemo(() => {
        const params: { [key: string]: string } = {
            action: 'get_events',
            from: date,
            to: date,
        };

        if (status === 1) {
            params.match_live = "1";
        }

        return new URLSearchParams(params).toString();
    }, [date, status]);


    const remapFunction: RemapFunctionType = useCallback((data) => {
        return data.map(item => ({
            matchInfo: {
                date: item.match_date,
                time: item.match_time,
                league: item.league_name,
                logo: item.league_logo,
                status: item.match_status,
                id: item.match_id,
                live: item.match_live
            },
            teamHome: {
                name: item.match_hometeam_name,
                srcLogo: item.team_home_badge,
                score: item.match_hometeam_score,
            },
            teamAway: {
                name: item.match_awayteam_name,
                srcLogo: item.team_away_badge,
                score: item.match_awayteam_score,
            }
        }));
    }, []);
    const { data, isLoading, isError } = useCustomData(remapFunction, queryParams);

    const matchesByLeague = data?.reduce((acc: Record<string, RemappedDataType[]>, match: RemappedDataType) => {
        const leagueName = match.matchInfo.league;
        if (!acc[leagueName]) {
            acc[leagueName] = [];
        }
        acc[leagueName].push(match);
        return acc;
    }, {});

    return (
        <div className='flex flex-col gap-3 mt-3'>
            {matchesByLeague && Object.keys(matchesByLeague).map((leagueName) => {
                const filteredMatches = matchesByLeague[leagueName].filter(statusFilters[status]);

                if (!leagueName || filteredMatches.length === 0) {
                    return null; 
                }

                return (
                    <div key={leagueName} className='bg-projectGrays-500 rounded-lg'>
                        <h3 className='font-semibold bg-projectGrays-500/50 border-projectGrays-300 border-b text-sm m-2 p-2'>{leagueName}</h3> {/* Nombre de la liga */}
                        <div className='flex flex-col px-2 pb-2'>
                            {filteredMatches.map((match: RemappedDataType) => (
                                <CardMatch
                                    key={match.matchInfo.id}
                                    matchInfo={match.matchInfo}
                                    teamHome={match.teamHome}
                                    teamAway={match.teamAway}
                                    orientation='horizontal'
                                />
                            ))}
                        </div>
                    </div>
                );
            })}

            {isLoading && <div className='flex justify-center text-sm font-semibold my-2 items-center h-full'>Cargando...</div>}
            {isError && <div className='flex justify-center text-sm font-semibold my-2 items-center h-full'>Error al cargar los partidos</div>}
        </div>
    );
}
