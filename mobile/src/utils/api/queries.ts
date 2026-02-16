import { useInfiniteQuery } from '@tanstack/react-query';

import { TVehicle } from '@shared/types';

const API_BASE_URL: string = process.env.EXPO_PUBLIC_API_BASE_URL;
const PAGE_SIZE: number = 10;
// Simulated delay for demonstration; displays loading indicator and renders UI skeleton
const FAKE_PAGE_DELAY_MS: number = 700;

type TVehiclesPage = {
  items: TVehicle[];
  nextPage: number | null;
  total: number;
};

const VEHICLES_INFINITE_QUERY_KEY: readonly ['vehicles', 'infinite', { pageSize: number }] = [
  'vehicles',
  'infinite',
  { pageSize: PAGE_SIZE },
];

async function delay(ms: number): Promise<void> {
  await new Promise<void>((resolve: () => void) => {
    setTimeout(resolve, ms);
  });
}

async function fetchVehiclesPage(page: number): Promise<TVehiclesPage> {
  if (!API_BASE_URL) {
    throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');
  }

  const response: Response = await fetch(`${API_BASE_URL}/vehicles`);

  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }

  const payload: TVehicle[] = await response.json();

  const startIndex: number = (page - 1) * PAGE_SIZE;
  const endIndex: number = startIndex + PAGE_SIZE;
  const items: TVehicle[] = payload.slice(startIndex, endIndex);
  const nextPage: number | null = endIndex < payload.length ? page + 1 : null;

  await delay(FAKE_PAGE_DELAY_MS);

  return {
    items,
    nextPage,
    total: payload.length,
  };
}

export function useVehiclesInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: VEHICLES_INFINITE_QUERY_KEY,
    queryFn: ({ pageParam }: { pageParam: number }) => fetchVehiclesPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TVehiclesPage): number | undefined =>
      lastPage.nextPage ?? undefined,
    staleTime: 60_000,
  });
}
