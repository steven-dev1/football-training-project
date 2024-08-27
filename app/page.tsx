'use client'
import CardFinishedMatch from '@/components/Cards/CardMatch';
import StandingTable from '@/components/Tables/StandingTable';
import { RemappedDataType } from '@/types/GameData';
import useSWR from 'swr';
import { useCustomData } from '@/hooks/useCustomData';
import { RemapFunctionType } from '@/types/GameData';
import { useMemo, useCallback } from 'react';
import LeftNav from '@/components/Navs/LeftNav';
import { Star } from 'lucide-react';
import FavouritesSection from '@/components/Sections/FavouritesSection';




export default function Home() {

  return (
    <div className='flex items-start max-w-[1280px] justify-evenly mx-auto'>
      <div className='w-1/4'>
        <LeftNav />
      </div>
      <div className='w-full flex flex-col p-2 justify-between'>
        <FavouritesSection />
      </div>
      <div className=''>
        <StandingTable />
      </div>
    </div>
  );
}

