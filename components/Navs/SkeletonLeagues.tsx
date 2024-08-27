import { SkeletonLogoItemHorizontal } from "../Teams/SkeletonLogoItem";

const SkeletonLigas = () => {
    return (
      <div className="bg-projectGrays-300 w-[300px] p-2 rounded-lg h-full m-2 flex flex-col">
        <div className="mb-3">
          <div className="flex w-full justify-between mb-3">
            <div className="bg-gray-300 h-4 w-[60px] rounded-full"></div>
          </div>
          <div className="flex items-start justify-start flex-col gap-2">
            {[...Array(20)].map((_, i) => (
              <SkeletonLogoItemHorizontal key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLigas;