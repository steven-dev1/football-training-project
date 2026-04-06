import LoadingError from "@/components/Loading/LoadingError";
import SkeletonTable from "@/components/Tables/SkeletonTable";
import { useCustomData } from "@/hooks/useCustomData";
import { filterUniqueScorers } from "@/infrastructure/utils/helpers";
import { remapScorers } from "@/infrastructure/utils/remap";
import { Scorers } from "@/types/GameData";
import { BiFootball } from "react-icons/bi";

export default function ScorersSection({
  leagueId,
  isLarge,
}: {
  leagueId: string;
  isLarge: boolean;
}) {
  const queryParams = new URLSearchParams({
    action: "get_topscorers",
    league_id: leagueId,
  });
  const { data, isLoading, isError } = useCustomData(remapScorers, queryParams);

  if (isError)
    return (
      <LoadingError>Ocurrio un error al cargar los goleadores!</LoadingError>
    );
  if (isLoading)
    return (
      <div>
        <SkeletonTable isLarge={isLarge} />
      </div>
    );

  return (
    <div className="overflow-x-auto p-2 m-2">
      <table className="w-full mx-auto">
        <thead>
          <tr className="">
            <th className="p-2 text-center">Posición</th>
            <th className="p-2 text-center">Nombre</th>
            <th className="p-2 text-center">Equipo</th>
            <th className="p-2 text-center">Goles</th>
          </tr>
        </thead>
        <tbody>
          {filterUniqueScorers(data)
            ?.slice(0, 10)
            .map((scorer: Scorers, index: number) => (
              <tr
                key={scorer.key}
                className="hover:bg-projectGrays-700 text-center"
              >
                <td className="p-2 text-2xl font-bold rounded-s-xl">{index + 1}.</td>
                <td className="p-2 text-sm font-semibold">{scorer.name}</td>
                <td className="p-2 text-xs text-projectGrays-100 font-semibold truncate">
                  {scorer.teamName}
                </td>
                <td className="p-2 flex justify-center items-center gap-1 rounded-e-lg">
                  <div className="text-2xl text-projectGrays-100">
                    <BiFootball />
                  </div>
                  <p>{scorer.goals}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
