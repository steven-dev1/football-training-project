import React from 'react'
import LogoItem from '../Teams/LogoItem';
import SkeletonTable from './SkeletonTable';
import { useCustomData } from '@/hooks/useCustomData';
import { HeaderTable } from './HeaderTable';
import { StandingTables } from '@/types/GameData';
import { remapStandingTable } from '@/infrastructure/utils/remap';

export default function StandingTable() {
    const queryParams = new URLSearchParams({
        action: 'get_standings',
        league_id: '120',
    });


    const { data, isLoading, isError } = useCustomData(remapStandingTable, queryParams);
    const sortedTeams = data?.sort((a: StandingTables, b: StandingTables): number => Number(a.teamStats?.position) - Number(b.teamStats?.position));
    
    if (isError) return <div>Ocurrio un error al cargar la tabla!</div>
    if (isLoading) return <div><SkeletonTable /></div>

    return (
        <div className="relative w-[300px] overflow-x-auto shadow-md sm:rounded-lg m-2 p-2 bg-projectGrays-300">
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <p className='p-2 text-xs font-medium leading-4 pb-1'>{sortedTeams[0].league_name}</p>
                </div>
                <h1 className='text-center text-xl leading-3 font-bold p-2 pt-1'>Posiciones</h1>
            </div>
            <table className='w-full text-sm text-left text-white'>
                <thead>
                    <HeaderTable />
                </thead>
                <tbody>
                    {sortedTeams.map((item: StandingTables) => {
                        if(item.league.season?.toLowerCase() !== 'clausura') return
                        return (
                            <tr key={item.teamInfo.id} className='odd:bg-[#2C2C2C] py-1 px-1 rounded-lg'>
                                <td scope='row' className={`m-1 ml-0 pl-2 text-center ${item.teamStats.position < 9 && 'text-green-500 rounded-full'} w-8 font-semibold whitespace-nowrap`}>{item.teamStats.position}</td>
                                <td className='m-1 ml-0 px-4 py-1 flex items-center gap-2'>
                                    <LogoItem
                                        id={item.teamInfo.id}
                                        srcLogo={item.teamInfo.srcLogo}
                                        name={item.teamInfo.name}
                                        orientation={'horizontal'}
                                    />
                                </td>
                                <td className='m-1 ml-0 py-1 px-1 '>{item.teamStats.points}</td>
                                <td className='m-1 ml-0 py-1 px-1 '>{item.teamStats.played}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
