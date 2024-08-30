export interface ToggleFunctions {
    data: string | number;
    toggleFN: () => void;
}

// Tipo de la función de remapeo
export type RemapFunctionType<T,F> = (data: F[]) => T[] | Record<string, T>;