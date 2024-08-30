'use client'
import StandingTable from '@/components/Tables/StandingTable';
import LeftNav from '@/components/Navs/LeftNav';
import FavouritesSection from '@/components/Sections/FavouritesSection';
import MatchesSection from '@/components/Sections/MatchesSection';
export default function Home() {

  return (
    <>
      <div className='w-1/4'>
        <LeftNav />
      </div>
      <div className='w-full flex flex-col p-2 items-center'>
        <FavouritesSection />
        <MatchesSection />
      </div>
      <div className=''>
        <StandingTable />
      </div>
    </>
  );
}

