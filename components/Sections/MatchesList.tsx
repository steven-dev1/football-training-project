import React, { useMemo } from 'react'
import CardMatch from '../Cards/CardMatch/CardMatch'
import { useCustomData } from '@/hooks/useCustomData';
import { statusFilters } from '@/infrastructure/utils/helpers';
import { remapFavorites } from '@/infrastructure/utils/remap';

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


    const { data, isLoading, isError } = useCustomData(remapFavorites, queryParams);

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
