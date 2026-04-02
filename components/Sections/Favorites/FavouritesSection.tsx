'use client'
import React, { useEffect, useState } from 'react'
import { BsStarFill } from "react-icons/bs";
import { CardMatch } from '../../Cards/CardMatch/CardMatch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { listFavorites } from '@/redux/features/favoritesSlice';
import { Match } from '@/types/GameData';
import { fetchFavorites } from '@/infrastructure/utils/fetchers';
import { createSession } from '@/supabase/client';
import SkeletonFavoritesSection from './SkeletonFavoritesSection';
import { CircleAlert } from 'lucide-react';

export default function FavoritesSection() {
    const stateFavorites = useAppSelector((state) => state.favoriteStates.favorites);
    const dispatch = useAppDispatch();
    const [favorites, setFavorites] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const dataFetching = async () => {
        try {
            const sessionId = localStorage.getItem('sessionId');
            if (!sessionId) {
                createSession();
                return;
            }

            const data = await fetchFavorites(sessionId);
            if (data?.length > 0) {
                setFavorites(data);
                setLoading(false)
                const favoriteIds = data.map((fav: Match) => fav.matchInfo.id); 

                if (JSON.stringify(favoriteIds) !== JSON.stringify(stateFavorites)) {
                    dispatch(listFavorites(favoriteIds));
                }
            } else {
                setFavorites([]);
                setLoading(false)
            }
        } catch (error) {
            if(error instanceof Error) console.error('Error fetching favorites:', error.message);
            setError(true)
        }
    };

    useEffect(() => {
        dataFetching();
    }, [stateFavorites]);


    return (
        <section className='w-full'>
            <div>
                <h1 className='text-sm w-full flex items-center justify-start gap-1 font-semibold mb-2'><BsStarFill />Favoritos</h1>
            </div>
            {error  ? !loading && <p className='flex gap-2 items-center p-4 justify-center w-full'>Hubo un error al recuperar los favoritos. Intenta más tarde. <CircleAlert /></p> : <div className={`grid ${favorites.length > 1 ? "grid-cols-2" : "grid-cols-1 justify-center"} justify-between gap-1 w-full`}>
                {loading && <SkeletonFavoritesSection />}
                {favorites.length > 0 ?
                    favorites.map((match) => {
                        return (
                            <CardMatch
                                key={match.matchInfo.id}
                                matchInfo={match.matchInfo}
                                teamHome={match.teamHome}
                                teamAway={match.teamAway}
                                orientation='vertical'
                            />
                        )
                    }) : !loading && <p className='flex gap-2 items-center p-4 justify-center w-full'>Agrega tus partidos favoritos para verlos aqui. <BsStarFill /></p>}
            </div>}
        </section>
    );
};
