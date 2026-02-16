import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { TVehicle } from '@shared/types';
import { delay } from './mockup-delay';
import { FAKE_PAGE_DELAY_MS, PAGE_SIZE, API_BASE_URL } from './const';

type TVehiclesPage = {
  items: TVehicle[];
  nextPage: number | null;
  total: number;
};

const VEHICLE_QUERY_KEY = (vehicleId: string): readonly ['vehicle', { id: string }] => [
  'vehicle',
  { id: vehicleId },
];

const VEHICLES_INFINITE_QUERY_KEY: readonly ['vehicles', 'infinite', { pageSize: number }] = [
  'vehicles',
  'infinite',
  { pageSize: PAGE_SIZE },
];

async function fetchVehiclesPage(page: number): Promise<TVehiclesPage> {
  if (!API_BASE_URL) {
    throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');
  }

  const response: Response = await fetch(`${API_BASE_URL}/vehicles`);

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

async function fetchVehicleById(vehicleId: string): Promise<TVehicle> {
  if (!API_BASE_URL) {
    throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');
  }

  const response: Response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`);

  const payload: TVehicle = await response.json();

  await delay(FAKE_PAGE_DELAY_MS);

  return payload;
}

export function useVehicleQuery(vehicleId: string) {
  return useQuery({
    queryKey: VEHICLE_QUERY_KEY(vehicleId),
    queryFn: () => fetchVehicleById(vehicleId),
    enabled: vehicleId.length > 0,
    staleTime: 60_000,
  });
}
