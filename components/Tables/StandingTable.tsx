import React from 'react'
import useSWR from 'swr'
import { Positions } from '@/types/GameData';
import LogoItem from '../Teams/LogoItem';
import SkeletonTable from './SkeletonTable';

export default function StandingTable() {
    const queryParams = new URLSearchParams({
        action: 'get_standings',
        league_id: '120',
    });
    const fetcher = (url: string) => fetch(url).then(r => r.json())

    const { data, error, isLoading } = useSWR(`/api/routes?${queryParams.toString()}`, fetcher)
    const sortedTeams = data?.sort((a: Positions, b: Positions): number => a.overall_league_position - b.overall_league_position);
    
    if (error) return <div>Ocurrio un error al cargar la tabla!</div>
    if (isLoading) return <div><SkeletonTable /></div>



    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-2 p-2 bg-projectGrays-300">
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <p className='p-2 leading-4 pb-1'>{sortedTeams[0].league_name}</p>
                </div>
                <h1 className='text-center text-xl leading-3 font-bold p-2 pt-1'>Posiciones</h1>
            </div>
            <table className='w-full text-sm text-left text-white'>
                <thead>
                    <tr>
                        <th scope='col' className='pl-2 text-center py-2 px-1'>#</th>
                        <th scope='col' className='py-2 px-1 max-w-[50px]'>Equipo</th>
                        <th scope='col' className='py-2 px-1'>Pts</th>
                        <th scope='col' className='py-2 px-1'>Pj</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTeams.map((team: Positions) => {
                        if (team.stage_name.toLowerCase() != 'clausura') return
                        return (
                            <tr key={team.team_id} className='odd:bg-[#2C2C2C] py-2 px-1 rounded-lg'>
                                <td scope='row' className={`m-1 ml-0 pl-2 text-center ${team.overall_league_position < 9 && 'text-green-500 rounded-full'} w-8 font-semibold whitespace-nowrap`}>{team.overall_league_position}</td>
                                <td className='m-1 ml-0 px-4 flex items-center gap-2'>
                                    <LogoItem
                                        srcLogo={team.team_badge}
                                        name={team.team_name}
                                        orientation={'horizontal'}
                                    />
                                </td>
                                <td className='m-1 ml-0 py-2 px-1 '>{team.overall_league_PTS}</td>
                                <td className='m-1 ml-0 py-2 px-1 '>{team.overall_league_payed}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
