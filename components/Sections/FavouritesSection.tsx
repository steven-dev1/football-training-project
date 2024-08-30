import { useCustomData } from '@/hooks/useCustomData';
import { RemapFunctionType, RemappedDataType } from '@/types/GameData';
import React, { useCallback, useMemo } from 'react'
import SkeletonFavoritesSection from './SkeletonFavoritesSection';
import { BsStarFill } from "react-icons/bs";
import CardMatch from '../Cards/CardMatch/CardMatch';

export default function FavouritesSection() {
    const queryParams = useMemo(() => new URLSearchParams({
        action: 'get_events',
        from: '2024-08-01',
        to: '2024-09-01',
        team_id: '10091'
    }).toString(), []);

    const remapFunction: RemapFunctionType = useCallback((data) => {
        return data.map(item => ({
            matchInfo: {
                date: item.match_date,
                time: item.match_time,
                league: item.league_name,
                logo: item.league_logo,
                live: item.match_live,
                status: item.match_status,
                id: item.match_id,
            },
            teamHome: {
                id: item.match_hometeam_id,
                name: item.match_hometeam_name,
                srcLogo: item.team_home_badge,
                score: item.match_hometeam_score,
            },
            teamAway: {
                id: item.match_awayteam_id,
                name: item.match_awayteam_name,
                srcLogo: item.team_away_badge,
                score: item.match_awayteam_score,
            }
        }));
    }, []);

    const { data, isLoading, isError } = useCustomData(remapFunction, queryParams);

    if (isLoading) return <SkeletonFavoritesSection />
    if (isError) return <div className='bg-red-400 text-white p-2 rounded-lg'>Ocurrio un error al cargar los favoritos!</div>
    return (
        <section className='w-full'>
            <div>
                <h1 className='text-sm w-full flex items-center justify-start gap-1 font-semibold mb-2'><BsStarFill />Favoritos</h1>

            </div>
            <div className='grid grid-cols-2 justify-between gap-1 w-full'>
                {data.slice(-2).map((match: RemappedDataType) => {
                    return (
                        <CardMatch
                            key={match.matchInfo.id}
                            matchInfo={match.matchInfo}
                            teamHome={match.teamHome}
                            teamAway={match.teamAway}
                            orientation='vertical'
                        />
                    )
                })}
            </div>
        </section>
    )
}
