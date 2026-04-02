import React from "react";

const SkeletonCardMatch = ({ isHorizontal }: { isHorizontal: boolean }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <article key={i} className={`relative bg-projectGrays-700 my-2 group rounded-lg w-full cursor-pointer ${isHorizontal ? 'flex items-center gap-2 justify-between px-3 py-3' : 'flex flex-col items-center border border-projectGrays-300 p-3 gap-4'}`}>
          {isHorizontal ? (
            <>
              <div className="w-[13%] h-6 bg-projectGrays-300 animate-pulse rounded"></div>
              <div className="text-projectGrays-300">|</div>
            </>
          ) : (
            <span className="font-medium text-xs text-projectGrays-100 text-center bg-projectGrays-300 animate-pulse h-4 rounded w-3/4"></span>
          )}

          <div className={`w-full flex justify-evenly ${isHorizontal ? 'items-center' : 'items-start gap-6'}`}>
            <div className={`${isHorizontal ? 'w-[25%] justify-end' : ''}`}>
              <div className="h-12 w-full bg-projectGrays-300 animate-pulse rounded"></div>
            </div>
            <div className="flex flex-col items-center w-[30%]">
              <div className="h-6 w-full bg-projectGrays-300 animate-pulse rounded"></div>
              <div className="h-4 w-1/2 bg-projectGrays-300 animate-pulse rounded mt-1"></div>
            </div>
            <div className={`${isHorizontal ? 'w-[25%] justify-start' : ''}`}>
              <div className="h-12 w-full bg-projectGrays-300 animate-pulse rounded"></div>
            </div>
          </div>
          <div className={`${isHorizontal ? 'flex items-center' : 'absolute top-0 right-0'} opacity-50`}>
            <div className="h-6 w-6 bg-projectGrays-300 animate-pulse rounded-full"></div>
          </div>
        </article>
      ))}
    </>
  );
};

export default SkeletonCardMatch;
