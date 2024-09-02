'use client'
import { GalleryVerticalEnd } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { useCustomData } from '@/hooks/useCustomData';
import { CountriesWithLeagues} from '@/types/GameData';
import SkeletonLigas from './SkeletonLeagues';
import { ToggleCountriesButton } from '../Buttons/ToggleCountriesButton';
import { CountryList } from './CountryList';
import { useAccordionToggle } from '@/hooks/useAccordionToggle';
import { SortButton } from '../Buttons/SortButton';
import { remapLeaguesByCountry } from '@/infrastructure/utils/remap';

export default function LeftNav() {
    const { id, showItems } = useAccordionToggle();
    const [countriesView, setCountriesView] = useState<number>(31);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const queryParams = useMemo(() => new URLSearchParams({
        action: 'get_leagues',
    }).toString(), []);

    const { data, isLoading, isError } = useCustomData(remapLeaguesByCountry, queryParams);

    if (isLoading) return <div><SkeletonLigas /></div>;
    if (isError) return <div>Error al cargar ligas</div>;

    const organizedLeagues: CountriesWithLeagues[] = Object.values(data);

    const sortedCountries = organizedLeagues.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.country.name.localeCompare(b.country.name);
        }
        return b.country.name.localeCompare(a.country.name);
    }).slice(0, countriesView);

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleToggleCountriesView = () => {
        setCountriesView(prevView => prevView === 31 ? organizedLeagues.length : 31);
    };

    return (
        <div className='bg-projectGrays-300 w-[250px] p-4 pb-1 rounded-lg h-full m-2 flex flex-col'>
            <div>
                <div className='mb-3'>
                    <div className='flex w-full justify-between mb-1'>
                        <h1 className='font-bold'>Ligas</h1>
                        <div className='flex  items-center justify-center'>
                            <button className='transition-all duration-100 hover:bg-projectGrays-500 p-1 rounded-md' onClick={() => {
                                showItems('');
                                setCountriesView(31);
                            }}>
                                <GalleryVerticalEnd size={18} />
                            </button>
                            <div className='flex justify-between items-center'>
                                <SortButton data={sortOrder} toggleFN={toggleSortOrder} />
                            </div>
                        </div>
                    </div>
                    <CountryList
                        sortedCountries={sortedCountries}
                        accordionID={id}
                        showLeagues={showItems}
                    />
                    <div className='w-full flex justify-center items-center mt-2'>
                        <ToggleCountriesButton data={countriesView} toggleFN={handleToggleCountriesView} />
                    </div>
                </div>
            </div>
        </div>
    );
}
