import { ChevronDown } from 'lucide-react'
import React from 'react'
import LogoItem from '../Teams/LogoItem'

export default function LeftNav() {
    return (
        <div className='bg-projectGrays-300 p-2 rounded-lg m-2 flex flex-col'>
            <div>
                <div className='flex w-full justify-between mb-1'>
                    <h1 className='font-semibold text-sm'>Ligas populares</h1>
                    <ChevronDown />
                </div>
                <div className='ml-4'>
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
    )
}
