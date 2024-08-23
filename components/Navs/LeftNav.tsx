'use client'
import { ChevronDown, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import LogoItem from '../Teams/LogoItem'
import { useCustomData } from '@/hooks/useCustomData';
import { CountriesWithLeagues, Country, RemapFunctionType } from '@/types/GameData';
import SkeletonLigas from './SkeletonLeagues';
import Image from 'next/image';

export default function LeftNav() {

    const [accordionID, setAccordionID] = useState<string>('')

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


    return (
        <div className='bg-projectGrays-300 w-[300px] p-2 rounded-lg h-full m-2 flex flex-col'>
            <div>
                <div className='mb-3'>
                    <div className='flex w-full justify-between mb-1'>
                        <h1 className='font-semibold text-sm'>Ligas</h1>
                    </div>
                    <div className='ml-1 flex flex-col'>
                        {Object.values(organizedLeagues)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((country) => {
                            return (
                                <div key={country.id}>
                                    <div onClick={(e) => showLeagues(e.currentTarget.id)} id={country.id} className='flex p-1 rounded-md hover:bg-projectGrays-500 cursor-pointer items-center gap-2 justify-between'>
                                        <div className='flex items-center gap-1'>
                                            <Image src={country.logo == "" ? "https://apiv3.apifootball.com/badges/logo_country/166_world-cup.png" : country.logo} alt={country.name} width={20} height={20} />
                                            <h2 className='text-xs font-semibold'>{country.name}</h2>
                                        </div>
                                    </div>
                                    {country.id == accordionID &&
                                        <div className={`pl-3 flex flex-col gap-1 my-1 rounded-lg`}>
                                            {country.leagues.map((league) => (
                                                <LogoItem
                                                    key={league.id}
                                                    name={league.name}
                                                    srcLogo={league.logo == "" ? "https://apiv3.apifootball.com/badges/logo_country/166_world-cup.png" : league.logo}
                                                />
                                            ))}
                                            <hr className='border-1 mt-2 w-full border-projectGrays-500'/>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
