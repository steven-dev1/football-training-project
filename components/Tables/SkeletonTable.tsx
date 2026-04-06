import { SkeletonTableRow } from "./SkeletonTableRow";

const SkeletonTable = ({ isLarge }: { isLarge: boolean }) => {
  return (
    <div
      className={`relative ${
        isLarge ? "max-w-full" : "w-[285px]"
      } overflow-x-auto shadow-md sm:rounded-lg m-2 py-2 bg-projectGrays-700`}
    >
      <div className="flex flex-col justify-center items-center">
        <div>
          <div className="bg-projectGrays-300 h-4 w-[150px] rounded mt-2 mb-1 animate-pulse"></div>
        </div>
        <div className="bg-projectGrays-300 h-6 w-[100px] rounded mt-1 mb-2 animate-pulse"></div>
      </div>
      <table className="w-full text-sm text-left text-white">
        <thead>
          <tr>
            <th className="pl-2 text-center py-3">
              <div className="bg-projectGrays-300 h-4 w-4 mx-auto rounded animate-pulse"></div>
            </th>
            <th className="px-1 py-3 max-w-[50px]">
              <div className="bg-projectGrays-300 h-4 w-[100px] rounded animate-pulse"></div>
            </th>
            <th className="px-1 py-3">
              <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
            </th>
            <th className="px-1 py-3">
              <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
            </th>
            {isLarge && (
              <>
                <th className="px-1 py-3">
                  <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
                </th>
                <th className="px-1 py-3">
                  <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
                </th>
                <th className="px-1 py-3">
                  <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
                </th>
                <th className="px-1 py-3">
                  <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
                </th>
                <th className="px-1 py-3">
                  <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {[...Array(15)].map((_, index) => (
            <SkeletonTableRow key={index} isLarge={isLarge} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
