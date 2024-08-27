export const SkeletonLogoItem = () => {
    return (
        <div className='flex flex-col items-center max-w-[70px] '>
            <div className='bg-gray-300 rounded-full w-[50px] h-[50px]' />
            <div className='bg-gray-300 h-4 w-[80px] mt-2 rounded'></div>
        </div>
    );
};

export const SkeletonLogoItemHorizontal = () => {
    return (
        <div className='flex items-center justify-start gap-2 w-full '>
            <div className='bg-gray-300 rounded-full w-[20px] h-[20px]' />
            <div className='bg-gray-300 h-4 w-full rounded-full'></div>
        </div>
    );
};