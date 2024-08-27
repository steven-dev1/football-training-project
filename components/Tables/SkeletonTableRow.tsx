export const SkeletonTableRow = () => {
    return (
      <tr className="odd:bg-[#2C2C2C] p-2 rounded-lg">
        <td className="m-1 ml-0 pl-2 text-center w-8 font-semibold">
          <div className="bg-gray-300 h-4 w-4 rounded"></div>
        </td>
        <td className="m-1 ml-0 px-1 flex items-center gap-2">
          <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-[100px] rounded"></div>
        </td>
        <td className="m-1 ml-0 px-1">
          <div className="bg-gray-300 h-4 w-8 rounded"></div>
        </td>
        <td className="m-1 ml-0 px-1">
          <div className="bg-gray-300 h-4 w-8 rounded"></div>
        </td>
      </tr>
    );
  };