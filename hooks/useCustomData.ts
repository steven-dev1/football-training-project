import useSWR from 'swr';
import { customFetcher } from '@/infrastructure/utils/fetchers';

export function useCustomData(remapFunction: Function, queryParams: Object) {
  const { data, error } = useSWR([`/routes?${queryParams.toString()}`, remapFunction], ([url, remapFn]) => customFetcher(url, remapFn));

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}