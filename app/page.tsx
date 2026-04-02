'use client'
import StandingTable from '@/components/Tables/StandingTable';
import LeftNav from '@/components/Navs/LeftNav';
import FavoritesSection from '@/components/Sections/Favorites/FavouritesSection';
import React from 'react'
import MatchesSection from '@/components/Sections/Matches/MatchesSection';

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
        <StandingTable width='small' leagueId='302'/>
      </div>
    </>
  );
}

