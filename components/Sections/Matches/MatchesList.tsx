import React, { useMemo } from "react";
import { useCustomData } from "@/hooks/useCustomData";
import { statusFilters } from "@/infrastructure/utils/helpers";
import { remapMatchesByLeague } from "@/infrastructure/utils/remap";
import { Match } from "@/types/GameData";
import { CardMatch } from "@/components/Cards/CardMatch/CardMatch";
import HorizontalSkeletonMatch from "@/components/Cards/CardMatch/HorizontalSkeletonMatch";

interface MatchesListProps {
  date: string;
  status: number;
  search: string;
}

export default function MatchesList({
  date,
  status,
  search,
}: MatchesListProps) {
  const queryParams = useMemo(() => {
    const params: { [key: string]: string } = {
      action: "get_events",
      from: date,
      to: date,
    };

    if (status === 1) {
      params.match_live = "1";
    }

    return new URLSearchParams(params).toString();
  }, [date, status]);

  const { data, isLoading, isError } = useCustomData(
    remapMatchesByLeague,
    queryParams
  );
  if (isLoading) return <HorizontalSkeletonMatch />;
  if (isError)
    return (
      <div className="flex justify-center text-sm font-semibold my-2 items-center h-full">
        Error al cargar los partidos
      </div>
    );

  return (
    <div className="flex flex-col gap-2 mt-3">
      {Object.keys(data).map((leagueId) => {
        const leagueData = data[leagueId];
        const filteredMatchesByStatus = leagueData.matches.filter(
          statusFilters[status]
        );
        const filteredMatches =
          search === ""
            ? filteredMatchesByStatus
            : filteredMatchesByStatus.filter(
                (match: Match) =>
                  match.teamHome.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  match.teamAway.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
              );
        if (filteredMatches.length === 0) return;
        return (
          <div key={leagueId} className="bg-projectGrays-700 rounded-lg">
            <h3 className="font-semibold bg-projectGrays-700/50 border-projectGrays-500 border-b text-sm m-2 p-2">
              {leagueData.league.name}
            </h3>
            <div className="flex flex-col px-2 pb-2">
              {filteredMatches?.map((item: Match) => (
                <CardMatch
                  key={item.matchInfo.id}
                  matchInfo={item.matchInfo}
                  teamHome={item.teamHome}
                  teamAway={item.teamAway}
                  orientation="horizontal"
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
