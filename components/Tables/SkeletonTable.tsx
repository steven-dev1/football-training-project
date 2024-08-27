import { SkeletonTableRow } from "./SkeletonTableRow";

const SkeletonTable = () => {
    return (
      <div className="relative w-[285px] overflow-x-auto shadow-md sm:rounded-lg m-2 py-2 bg-projectGrays-300">
        <div className="flex flex-col justify-center items-center">
          <div>
            <div className="bg-gray-300 h-4 w-[150px] rounded mt-2 mb-1"></div>
          </div>
          <div className="bg-gray-300 h-6 w-[100px] rounded mt-1 mb-2"></div>
        </div>
        <table className="w-full text-sm text-left text-white">
          <thead>
            <tr>
              <th className="pl-2 text-center py-3">
                <div className="bg-gray-300 h-4 w-4 mx-auto rounded"></div>
              </th>
              <th className="px-1 py-3 max-w-[50px]">
                <div className="bg-gray-300 h-4 w-[100px] rounded"></div>
              </th>
              <th className="px-1 py-3">
                <div className="bg-gray-300 h-4 w-8 rounded"></div>
              </th>
              <th className="px-1 py-3">
                <div className="bg-gray-300 h-4 w-8 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SkeletonTable;