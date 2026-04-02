import React from "react";

export const SkeletonLeagueInfo = () => {
  return (
    <>
      {/* Skeleton for league info */}
      <div className="max-w-full text-center rounded-lg bg-projectGrays-500 p-2">
        <h1 className="text-2xl font-semibold flex flex-col justify-center items-center gap-2">
          {/* Placeholder for league logo */}
          <div className="w-[50px] h-[50px] bg-projectGrays-700 rounded-lg animate-pulse" />
          {/* Placeholder for league name */}
          <div className="w-2/3 h-6 bg-projectGrays-700 rounded animate-pulse" />
        </h1>
        {/* Placeholder for season */}
        <div className="w-1/3 h-4 bg-projectGrays-700 animate-pulse mx-auto mt-2 rounded" />
      </div>

      {/* Skeleton for tabs */}
      <div className="p-2 rounded-lg mx-auto flex gap-2 bg-projectGrays-700">
        {/* Placeholder for each button */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-2 w-[80px] h-8 bg-projectGrays-500 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </>
  );
};

export default SkeletonLeagueInfo;