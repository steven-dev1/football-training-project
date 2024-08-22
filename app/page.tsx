'use client'
import CardFinishedMatch from '@/components/Cards/CardFinishedMatch';
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
    <div className='flex items-start gap-4 max-w-[1280px] justify-evenly mx-auto'>
      <div className='w-1/4'>
        <LeftNav />
      </div>
      <div className='flex flex-col justify-center'>
          <FavouritesSection />
      </div>
      <div className='w-full'>
        <StandingTable />
      </div>
    </div>
  );
}

