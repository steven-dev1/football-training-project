'use client'
import React, { useEffect, useState } from 'react'
// import SkeletonFavoritesSection from './SkeletonFavoritesSection';
import { BsStarFill } from "react-icons/bs";
import { CardMatch } from '../Cards/CardMatch/CardMatch';
import { useAppDispatch, useAppSelector} from '@/redux/hooks';
import { initializeFavorites } from '@/redux/features/favoritesSlice';
import { Match } from '@/types/GameData';
import { httpPostActions } from '@/infrastructure/utils/helpers';

export default function FavoritesSection() {
    const favorites = useAppSelector((state) => state.favoriteStates.favorites)
    const dispatch = useAppDispatch();
    const [apiFavorites, setApiFavorites] = useState<Match[]>([])

    useEffect(() => {
        const fetchFavorites = async () => {
            const sessionId = localStorage.getItem('sessionId');
            if (!sessionId) return;

            try {
                const response = await fetch(`/api/favorites`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sessionId, 'action': httpPostActions.GET }),
                });
                if (!response.ok) {
                    console.error('Error en la respuesta de la API:', response.status);
                    return;
                }

                const data = await response.json();
                setApiFavorites(data)
                console.log(data)
                if (data && data.length > 0) {
                    dispatch(initializeFavorites(data.map((fav: Match) => fav.matchInfo.id)));
                }
            } catch (error) {
                console.error('Error al obtener los favoritos:', error);
            }
        };
        fetchFavorites();
    }, [dispatch]);

    return (
        <section className='w-full'>
            <div>
                <h1 className='text-sm w-full flex items-center justify-start gap-1 font-semibold mb-2'><BsStarFill />Favoritos</h1>
            </div>
            <div className='grid grid-cols-2 justify-between gap-1 w-full'>
                {apiFavorites.length > 0 ?
                    apiFavorites.map((match) => {
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
