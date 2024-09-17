'use client'
import React, { useEffect, useState } from 'react'
import { BsStarFill } from "react-icons/bs";
import { CardMatch } from '../Cards/CardMatch/CardMatch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { listFavorites } from '@/redux/features/favoritesSlice';
import { Match } from '@/types/GameData';
import { fetchFavorites } from '@/infrastructure/utils/fetchers';
import { createSession } from '@/supabase/client';

export default function FavoritesSection() {
    const stateFavorites = useAppSelector((state) => state.favoriteStates.favorites)
    const dispatch = useAppDispatch();
    const [favorites, setFavorites] = useState<Match[]>([])

    const dataFetching = async () => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            await createSession();
            return;
        }
        const data = await fetchFavorites(sessionId);
        if (data?.length > 0) {
            setFavorites(data);
            console.log('Data: ', data)
        }
    }
    useEffect(() => {
        const initializeSession = async () => {
            try {
                await dataFetching()
                console.log('Favorites: ', favorites)
                const favoriteIds = favorites.map((fav: Match) => fav.matchInfo.id);
                dispatch(listFavorites(favoriteIds));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        initializeSession();
    }, []);

    useEffect(() => {
        // dispatch(listFavorites(favorites.map((favoriteMatch: Match) => favoriteMatch.matchInfo.id)))
        console.log(stateFavorites);
    }, [favorites]);

    return (
        <section className='w-full'>
            <div>
                <h1 className='text-sm w-full flex items-center justify-start gap-1 font-semibold mb-2'><BsStarFill />Favoritos</h1>
            </div>
            <div className='grid grid-cols-2 justify-between gap-1 w-full'>
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
                    }) : <p>No se encontraron partidos</p>}
            </div>
        </section>
    );
};
