'use client'
import { ArrowDownAZ, ArrowDownZA, ArrowUpAZ, ArrowUpZA, GalleryVerticalEnd } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import LogoItem from '../Teams/LogoItem'
import { useCustomData } from '@/hooks/useCustomData';
import { CountriesWithLeagues } from '@/types/GameData';
import SkeletonLigas from './SkeletonLeagues';

export default function LeftNav() {

    const [accordionID, setAccordionID] = useState<string>('')
    const [countriesView, setCountriesView] = useState<number>(31)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const showLeagues = (id: string): void => {
        if (id == accordionID) {
            setAccordionID('')
        } else {
            setAccordionID(id)
        }
    }

    const queryParams = useMemo(() => new URLSearchParams({
        action: 'get_leagues',
    }).toString(), []);

    const remapFunction = useCallback((data: any) => {
        return data.map((item: any) => ({
            country: {
                id: item.country_id,
                name: item.country_name,
                logo: item.country_logo,
            },
            league: {
                id: item.league_id,
                name: item.league_name,
                logo: item.league_logo,
            }
        }));
    }, []);

    const { data, isLoading, isError } = useCustomData(remapFunction, queryParams);
    if (isLoading) return <div><SkeletonLigas /></div>
    if (isError) return <div>Error al cargar ligas</div>

    const organizedLeagues: Record<string, CountriesWithLeagues> = data.reduce(
        (acc: Record<string, CountriesWithLeagues>, item: any) => {
            const { id, name, logo } = item.country;
            const league = item.league;

            if (!acc[name]) {
                acc[name] = {
                    id,
                    name,
                    logo,
                    leagues: []
                };
            }

            acc[name].leagues.push(league);
            return acc;
        },
        {} as Record<string, CountriesWithLeagues>
    );

    const sortedCountries = Object.values(organizedLeagues)
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            }
            return b.name.localeCompare(a.name);
        })
        .slice(0, countriesView);

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleToggleCountriesView = () => {
        setCountriesView(prevView => prevView === 31 ? Object.values(organizedLeagues).length : 31);
    };

    return (
        <div className='bg-projectGrays-300 w-[300px] p-2 rounded-lg h-full m-2 flex flex-col'>
            <div>
                <div className='mb-3'>
                    <div className='flex w-full justify-between mb-1'>
                        <h1 className='font-semibold'>Ligas</h1>
                        <div className='flex items-center justify-center gap-2'>
                            <button onClick={() => {
                                showLeagues('')
                                setCountriesView(31)
                            }}>
                                <GalleryVerticalEnd size={18} />
                            </button>
                            <div className='flex justify-between items-center'>
                                <button
                                    onClick={toggleSortOrder}
                                    className='underline text-sm font-semibold'
                                >
                                    {sortOrder === 'asc' ? <ArrowUpAZ size={18} /> : <ArrowDownZA size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='ml-1 flex flex-col'>
                        {sortedCountries.map((country) => (
                            <div key={country.id}>
                                <div
                                    onClick={(e) => showLeagues(e.currentTarget.id)}
                                    id={country.id}
                                    className={`flex p-1 px-2 rounded-md hover:bg-projectGrays-500 cursor-pointer items-center gap-2 justify-between ${country.id === accordionID ? "bg-projectGrays-500" : "bg-transparent"}`}
                                >
                                    <div className='flex items-center gap-1'>
                                        <h2 className='text-xs font-semibold'>{country.name}</h2>
                                    </div>
                                </div>
                                {country.id === accordionID && (
                                    <div className='pl-3 flex flex-col gap-1 my-1 rounded-lg'>
                                        {country.leagues.map(league => (
                                            <LogoItem
                                                key={league.id}
                                                name={league.name}
                                                srcLogo={league.logo || "https://apiv3.apifootball.com/badges/logo_country/166_world-cup.png"}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={handleToggleCountriesView}
                            className='underline mx-auto text-sm font-semibold'
                        >
                            {countriesView === 31 ? 'Mostrar más' : 'Mostrar menos'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
