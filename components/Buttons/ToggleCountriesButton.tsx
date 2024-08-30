import { ToggleFunctions } from "@/types/Functions";

export function ToggleCountriesButton({ data, toggleFN }: ToggleFunctions) {
    return (
        <button
            onClick={toggleFN}
            className='bg-projectGrays-500 transition-all duration-150 hover:bg-black py-1 px-2 rounded-lg text-sm font-semibold'
        >
            {data === 31 ? 'Mostrar más' : 'Mostrar menos'}
        </button>
    );
}