'use client'
import CardFinishedMatch from '@/components/Cards/CardFinishedMatch';
import StandingTable from '@/components/Tables/StandingTable';
import { RemappedDataType } from '@/types/GameData';
import useSWR from 'swr';
import { useCustomData } from '@/hooks/useCustomData';
import { RemapFunctionType } from '@/types/GameData';
import { useMemo, useCallback } from 'react';




export default function Home() {

  const queryParams = useMemo(() => new URLSearchParams({
    action: 'get_events',
    from: '2024-08-01',
    to: '2024-08-31',
    league_id: '120',
    team_id: '544'
  }).toString(), []);

  const remapFunction: RemapFunctionType = useCallback((data) => {
    return data.map(item => ({
      matchInfo: {
        date: item.match_date,
        league: item.league_name,
        logo: item.league_logo,
        status: item.match_status,
        id: item.match_id,
      },
      teamHome: {
        name: item.match_hometeam_name,
        srcLogo: item.team_home_badge,
        score: item.match_hometeam_score,
      },
      teamAway: {
        name: item.match_awayteam_name,
        srcLogo: item.team_away_badge,
        score: item.match_awayteam_score,
      }
    }));
  }, []);

  const { data, isLoading, isError } = useCustomData(remapFunction, queryParams);

  if (isLoading) return <div>🔘Cargando... </div>;
  if (isError) return <div>Ocurrio un error 🚫</div>;

  return (
    <div className='flex items-center'>
      <div className='flex flex-wrap justify-between'>
        {data.map((match: RemappedDataType) => {
          return (
            <CardFinishedMatch
              key={match.matchInfo.id}
              matchInfo={match.matchInfo}
              teamHome={match.teamHome}
              teamAway={match.teamAway}
              orientation='vertical'
            />
          )
        })}
      </div>
      <div className='flex'>
        <StandingTable />
      </div>
    </div>
  );
}

