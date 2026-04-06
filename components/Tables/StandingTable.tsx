import React from 'react'
import LogoItem from '../Teams/LogoItem';
import SkeletonTable from './SkeletonTable';
import { useCustomData } from '@/hooks/useCustomData';
import { TableHeader } from './TableHeader';
import { StandingTableProps, StandingTables } from '@/types/GameData';
import { remapStandingTable } from '@/infrastructure/utils/remap';
import { useRouter } from 'next/navigation';
import LoadingError from '../Loading/LoadingError';

export default function StandingTable({ width, leagueId }: StandingTableProps) {
    const queryParams = new URLSearchParams({
        action: 'get_standings',
        league_id: leagueId,
    });

    const router = useRouter();
    const isLarge = width === 'large';
    const rowClass = isLarge ? 'm-1 ml-0 py-2 px-4 font-medium text-center' : 'm-1 ml-0 py-1 px-1 text-center'

    const handleRowClick = (id: string) => {
        router.push(`/team/${id}`);
    };

    const { data, isLoading, isError } = useCustomData(remapStandingTable, queryParams);
    const sortedTeams = data?.sort((a: StandingTables, b: StandingTables): number => Number(a.teamStats?.position) - Number(b.teamStats?.position));

    if (isError) return <LoadingError>Ocurrio un error al cargar la tabla!</LoadingError>
    if (isLoading) return <div><SkeletonTable isLarge={isLarge}/></div>

    return (
        <div className={`relative ${isLarge ? 'max-w-full' : 'w-[300px]'} overflow-x-auto shadow-md sm:rounded-lg m-2 p-2 bg-projectGrays-500`}>
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <p className='p-2 text-xs font-medium leading-4 pb-1'>{sortedTeams[0].league_name}</p>
                </div>
                <h1 className='text-center text-xl leading-3 font-bold p-2 pt-1'>Posiciones</h1>
            </div>
            <table className='w-full text-sm text-left text-white border-separate border-spacing-0'>
                <thead>
                    <TableHeader width={width} />
                </thead>
                <tbody>
                    {sortedTeams.map((item: StandingTables) => {
                        if (leagueId == '120' && item.league.season?.toLowerCase() !== 'clausura') return
                        if (leagueId == '44' && item.league.season !== "2nd Phase") return
                        return (
                            <tr onClick={() => handleRowClick(item.teamInfo.id)} key={item.teamInfo.id} className='hover:bg-projectGrays-700 cursor-pointer py-1 px-1 rounded-lg'>
                                <td scope='row' className={`rounded-s-xl m-1 ml-0 pl-2 text-center ${item.teamStats.position < 9 && 'text-green-500'} w-8 font-semibold whitespace-nowrap`}>{item.teamStats.position}</td>
                                <td className={`${rowClass} flex items-center gap-2`}>
                                    <LogoItem
                                        id={item.teamInfo.id}
                                        srcLogo={item.teamInfo.srcLogo}
                                        name={item.teamInfo.name}
                                        href={`/team/${item.teamInfo.id}`}
                                        orientation={'horizontal'}
                                    />
                                </td>
                                <td className={rowClass}> {item.teamStats.points} </td>
                                <td className={!isLarge ? `${rowClass} rounded-e-xl` : `${rowClass} hidden md:block`}> {item.teamStats.played} </td>
                                {isLarge && <>
                                    <td className={rowClass}> {item.teamStats.wins} </td>
                                    <td className={rowClass}> {item.teamStats.draws} </td>
                                    <td className={rowClass}> {item.teamStats.losses} </td>
                                    <td className={rowClass}> {item.teamStats.goalsFavor} </td>
                                    <td className={`${rowClass} rounded-e-xl`}> {item.teamStats.goalsAgainst} </td>
                                </>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
