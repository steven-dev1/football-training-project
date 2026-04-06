import { CardMatch } from "@/components/Cards/CardMatch/CardMatch"; // Asegúrate de que CardMatch esté correctamente importado
import { useCustomData } from "@/hooks/useCustomData";
import { formatDate } from "@/infrastructure/utils/helpers";
import { remapAndGroupMatchesByDate } from "@/infrastructure/utils/remap";
import { Match } from "@/types/GameData";
import React, { useMemo } from "react";
import SkeletonCardMatch from "./SkeletonCardMatch";

export default function UpcomingMatches({ leagueId, type }: { leagueId: string, type: 'upcoming' | 'results' }) {
    const queryParams = useMemo(() => {
        const newDate = new Date();
        const fromDate = newDate.toISOString().slice(0, 10);
        const toDate = new Date(newDate);
        toDate.setMonth(toDate.getMonth() + 1);
        const formattedToDate = toDate.toISOString().slice(0, 10);
      
        const params: { [key: string]: string } = {
          action: "get_events",
          league_id: leagueId,
        };
    
      
        if (type === 'upcoming') {

          params.from = fromDate;
          params.to = formattedToDate;
        } else {

          const pastFromDate = new Date(newDate);
          pastFromDate.setMonth(pastFromDate.getMonth() - 1);
          const formattedPastFromDate = pastFromDate.toISOString().slice(0, 10);
      
          params.from = formattedPastFromDate;
          params.to = fromDate;
        }
      
        return new URLSearchParams(params).toString();
      }, [leagueId]);

  const { data } = useCustomData(remapAndGroupMatchesByDate, queryParams);

  if (!data) {
    return <SkeletonCardMatch isHorizontal/>; 
  }

  return (
    <div>
      {Object.keys(data).length === 0 ? ( 
        <p>No hay partidos programados.</p>
      ) : (
        Object.keys(data)
        .sort((a, b) => {
          const dateA = new Date(a).getTime();
          const dateB = new Date(b).getTime();
          return type === 'results' ? dateB - dateA : dateA - dateB;
        })
        .map((date) => {
            const formatedDate = formatDate(date);
          return (
            <div key={date} className="bg-projectGrays-700 rounded-lg mt-2">
              <h2 className="font-semibold bg-projectGrays-700/50 border-projectGrays-500 border-b text-sm m-2 p-2">
                {formatedDate}
              </h2>
              {data[date].map((item: Match) => (
                <CardMatch
                  key={item.matchInfo.id}
                  matchInfo={item.matchInfo}
                  teamHome={item.teamHome}
                  teamAway={item.teamAway}
                  orientation="horizontal"
                />
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
