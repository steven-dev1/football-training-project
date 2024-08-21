import { useCustomData } from '@/hooks/useCustomData';
import { RemapFunctionType, RemappedDataType } from '@/types/GameData';
import React, { useCallback, useMemo } from 'react'
import CardFinished from '../Cards/CardFinishedMatch';
import { Star } from 'lucide-react';

export default function FavouritesSection() {
    const queryParams = useMemo(() => new URLSearchParams({
        action: 'get_events',
        from: '2024-08-01',
        to: '2024-09-01',
        team_id: '544'
    }).toString(), []);

    const remapFunction: RemapFunctionType = useCallback((data) => {
        return data.map(item => ({
            matchInfo: {
                date: item.match_date,
                time: item.match_time,
                league: item.league_name,
                logo: item.league_logo,
                status: item.match_status,
                id: item.match_id,
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

    if(isLoading) return <div>Cargando favoritos...</div>
    if(isError) return <div>Ocurrio un error al cargar los favoritos!</div>
    return (
        <div>
            <h1 className='text-sm flex items-center gap-1 font-semibold mx-2'><Star size={18} />Favoritos</h1>
            <div className='flex flex-wrap gap-2 m-2 w-full'>
                {data.map((match: RemappedDataType) => {
                    return (
                        <CardFinished
                            key={match.matchInfo.id}
                            matchInfo={match.matchInfo}
                            teamHome={match.teamHome}
                            teamAway={match.teamAway}
                            orientation='vertical'
                        />
                    )
                })}
            </div>
        </div>
    )
}
