import useSWR from 'swr';
import { customFetcher } from '@/infrastructure/utils/fetchers';
import { useCallback } from 'react';


// Hook para usar SWR con el custom fetcher
export function useCustomData(remapFunction: Function, queryParams: Object) {
  const { data, error } = useSWR([`/api/routes?${queryParams.toString()}`, remapFunction], ([url, remapFn]) => customFetcher(url, remapFn));

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}