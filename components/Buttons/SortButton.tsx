import { ToggleFunctions } from "@/types/Functions";
import { ArrowDownZA, ArrowUpAZ } from "lucide-react";

export function SortButton({ data, toggleFN }: ToggleFunctions) {
    return (
        <button onClick={toggleFN} className='transition-all duration-100 hover:bg-projectGrays-500 p-1 rounded-md text-sm font-semibold'>
            {data === 'asc' ? <ArrowUpAZ size={18} /> : <ArrowDownZA size={18} />}
        </button>
    );
}