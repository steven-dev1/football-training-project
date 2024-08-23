import { SkeletonLogoItem } from "../Teams/SkeletonLogoItem";

const SkeletonMatchCard = () => {
    return (
      <article className='rounded-lg w-[290px] border-projectGrays-300 border-[3px] p-3 gap-2 flex flex-col items-center animate-pulse'>
        <div className='bg-gray-300 h-4 w-[100px] rounded'></div>
        <div className='w-full flex justify-center items-start gap-6'>
          <SkeletonLogoItem />
          <div className='flex flex-col items-center max-w-[70px]'>
            <div className='bg-gray-300 h-8 w-[70px] rounded'></div>
            <div className='bg-gray-300 h-4 w-[100px] mt-2 rounded'></div>
            <div className='bg-gray-300 h-4 w-[80px] mt-2 rounded'></div>
          </div>
          <SkeletonLogoItem />
        </div>
      </article>
    );
  };
  
  export default SkeletonMatchCard;