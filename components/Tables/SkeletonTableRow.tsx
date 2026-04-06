export const SkeletonTableRow = ({ isLarge }: { isLarge: boolean }) => {
    return (
      <tr>
        <td className="pl-2 text-center py-2 animate-pulse">
            <div className="bg-projectGrays-300 h-4 w-4 mx-auto rounded animate-pulse"></div>
        </td>
        <td className="px-1 py-2 max-w-[50px] animate-pulse">
            <div className="bg-projectGrays-300 h-4 w-[100px] rounded animate-pulse"></div>
        </td>
        <td className="px-1 py-2 animate-pulse">
            <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
        </td>
        <td className="px-1 py-2 animate-pulse">
            <div className="bg-pro h-4 w-8 rounded animate-pulse"></div>
        </td>
        {isLarge && <>
            <td className="px-1 py-2 animate-pulse">
                <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
            </td>
            <td className="px-1 py-2 animate-pulse">
                <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
            </td>
            <td className="px-1 py-2 animate-pulse">
                <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
            </td>
            <td className="px-1 py-2 animate-pulse">
                <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
            </td>
            <td className="px-1 py-2 animate-pulse">
                <div className="bg-projectGrays-300 h-4 w-8 rounded animate-pulse"></div>
            </td>
        </>}
    </tr>
    );
  };