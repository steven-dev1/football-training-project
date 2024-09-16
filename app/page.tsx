'use client'
import StandingTable from '@/components/Tables/StandingTable';
import LeftNav from '@/components/Navs/LeftNav';
import FavoritesSection from '@/components/Sections/FavouritesSection';
import MatchesSection from '@/components/Sections/MatchesSection';
// import { supabase } from '@/supabase/client';
// import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  return (
    <>
      <div className='w-1/4'>
        <LeftNav />
      </div>
      <div className='w-full flex flex-col p-2 items-center'>
        <FavoritesSection />
        <MatchesSection />
      </div>
      <div className=''>
        <StandingTable />
      </div>
    </>
  );
}

