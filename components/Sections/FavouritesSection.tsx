'use client'
import { useCustomData } from '@/hooks/useCustomData';
import { Match } from '@/types/GameData';
import React, { useMemo } from 'react'
import SkeletonFavoritesSection from './SkeletonFavoritesSection';
import { BsStarFill } from "react-icons/bs";
import { remapFavorites } from '@/infrastructure/utils/remap';
import { CardMatch } from '../Cards/CardMatch/CardMatch';
import { useAppSelector } from '@/redux/hooks';

export default function FavoritesSection() {
    const queryParams = useMemo(() => {
        const currentDate = new Date();
        const fromDate = new Date();
        
        fromDate.setDate(fromDate.getDay() - 14);
        const from = fromDate.toISOString().split('T')[0];
        const to = currentDate.toISOString().split('T')[0];
    
        return new URLSearchParams({
            action: 'get_events',
            from: from ?? '',
            to: to ?? '',
            team_id: '544'
        }).toString();
    }, []);

    const favorites = window.localStorage.getItem('FavoritesMatch')
    const matches: Match[] = favorites? JSON.parse(favorites) : [];

    const globalMatches = useAppSelector(state => state.favoriteStates.favorites)
    console.log(globalMatches)

    const { data, isLoading, isError } = useCustomData(remapFavorites, queryParams);

    if (isLoading) return <SkeletonFavoritesSection />
    if (isError) return <div className='bg-red-400 text-white p-2 rounded-lg'>Ocurrio un error al cargar los favoritos!</div>
    return (
        <section className='w-full'>
            <div>
                <h1 className='text-sm w-full flex items-center justify-start gap-1 font-semibold mb-2'><BsStarFill />Favoritos</h1>

            </div>
            <div className='grid grid-cols-2 justify-between gap-1 w-full'>
                {data.slice(-4).map((match: Match) => {
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
                {matches?.map((match: Match) => {
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
