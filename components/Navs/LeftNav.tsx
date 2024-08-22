import { ChevronDown } from 'lucide-react'
import React, { useCallback, useMemo } from 'react'
import LogoItem from '../Teams/LogoItem'
import { useCustomData } from '@/hooks/useCustomData';
import { CountriesWithLeagues, Country, RemapFunctionType } from '@/types/GameData';

export default function LeftNav() {

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
    if (isLoading) return <div>Cargando ligas</div>
    if (isError) return <div>Error al cargar ligas</div>

    return (
        <div className='bg-projectGrays-300 p-2 rounded-lg h-full m-2 flex flex-col'>
            <div>
                <div className='mb-3'>
                    <div className='flex w-full justify-between mb-1'>
                        <h1 className='font-semibold text-sm'>Ligas</h1>
                        <ChevronDown />
                    </div>
                    <div className='ml-4 flex flex-col gap-2'>
                        {data.map((item: any) => {
                            return (<LogoItem
                                key={item.id}
                                name={item.league.name}
                                srcLogo={item.league.logo}
                            />)
                        })}
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='flex w-full justify-between mb-1'>
                        <h1 className='font-semibold text-sm'>Equipos populares</h1>
                        <ChevronDown />
                    </div>
                    <div className='ml-4 flex flex-col gap-2'>
                        <LogoItem
                            name='LaLiga'
                            srcLogo='https://apiv3.apifootball.com/badges/logo_leagues/302_la-liga.png'
                        />
                        <LogoItem
                            name='Copa del Rey'
                            srcLogo='https://apiv3.apifootball.com/badges/logo_leagues/300_copa-del-rey.png'
                        />
                        <LogoItem
                            name='Segunda División'
                            srcLogo='https://apiv3.apifootball.com/badges/logo_leagues/301_segunda-división.png'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
