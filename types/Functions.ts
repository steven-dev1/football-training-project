export interface ToggleFunctions {
    data: string | number;
    toggleFN: () => void;
}

export type RemapFunctionType<T,F> = (data: F[]) => T[] | Record<string, T>;