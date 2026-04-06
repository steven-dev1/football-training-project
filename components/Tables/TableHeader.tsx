import React from "react"

interface HeaderTableProps {
    width: 'small' | 'large';
}

export const TableHeader = ({ width }: HeaderTableProps) => {
    const isLarge = width === 'large'
    const headerClass = isLarge ? 'py-2 px-4 text-center' : 'py-2 px-1 text-center'
    return <tr>
        <th scope='col' className='pl-2 text-center py-2 px-1'>#</th>
        <th scope='col' className='py-2 px-1 max-w-[50px]'>Equipo</th>
        <th scope='col' className={headerClass}>PTs</th>
        <th scope='col' className={headerClass}>Pj</th>
        {isLarge && <>
            <th scope='col' className={headerClass}>G</th>
            <th scope='col' className={headerClass}>E</th>
            <th scope='col' className={headerClass}>P</th>
            <th scope='col' className={headerClass}>GF</th>
            <th scope='col' className={headerClass}>GC</th>
        </>}
    </tr>
}