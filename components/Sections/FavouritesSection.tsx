import { useCustomData } from '@/hooks/useCustomData';
import {Favorites } from '@/types/GameData';
import React, { useMemo } from 'react'
import SkeletonFavoritesSection from './SkeletonFavoritesSection';
import { BsStarFill } from "react-icons/bs";
import CardMatch from '../Cards/CardMatch/CardMatch';
import { remapFavorites } from '@/infrastructure/util/remap';

export default function FavoritesSection() {
    const queryParams = useMemo(() => new URLSearchParams({
        action: 'get_events',
        from: '2024-08-01',
        to: '2024-09-01',
        team_id: '10091'
    }).toString(), []);
    const { data, isLoading, isError } = useCustomData(remapFavorites, queryParams);
    

    if (isLoading) return <SkeletonFavoritesSection />
    if (isError) return <div className='bg-red-400 text-white p-2 rounded-lg'>Ocurrio un error al cargar los favoritos!</div>
    return (
        <section className='w-full'>
            <div>
                <h1 className='text-sm w-full flex items-center justify-start gap-1 font-semibold mb-2'><BsStarFill />Favoritos</h1>

            </div>
            <div className='grid grid-cols-2 justify-between gap-1 w-full'>
                {data.slice(-2).map((match: Favorites) => {
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
