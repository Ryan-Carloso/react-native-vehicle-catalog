import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { TVehicle } from '@shared/types';

import {
  EVehiclesFilterType,
  VEHICLES_MAX_CACHED_PAGES,
  VEHICLES_PAGE_SIZE,
  VEHICLES_QUERY_STALE_TIME_MS,
} from '@/src/utils/api/const';
import { delay } from '@/src/utils/api/mockup-delay';
import { TVehiclesInfiniteQueryKey, TVehiclesPage } from '@/src/utils/api/types';
import { API_BASE_URL, FAKE_PAGE_DELAY_MS } from '@/src/utils/const';

type TVehiclesInfiniteQueryData = InfiniteData<TVehiclesPage, number>;

type TVehiclesInfiniteSelectedData = TVehiclesInfiniteQueryData & {
  vehicles: TVehicle[];
  featuredVehicle: TVehicle | null;
  totalItems: number;
};

const buildVehiclesInfiniteQueryKey = (
  filterType: EVehiclesFilterType,
): TVehiclesInfiniteQueryKey => [
  'vehicles',
  'infinite',
  { pageSize: VEHICLES_PAGE_SIZE, filterType },
];

const createVehiclesEndpoint = (page: number, filterType: EVehiclesFilterType): string => {
  if (!API_BASE_URL) {
    throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');
  }

  const queryParams: URLSearchParams = new URLSearchParams({
    _page: String(page),
    _per_page: String(VEHICLES_PAGE_SIZE),
  });

  if (filterType === EVehiclesFilterType.MY_FAVORITES) {
    queryParams.set('favourite', 'true');
  }

  if (filterType === EVehiclesFilterType.MY_BIDS) {
    queryParams.set('hasBid', 'true');
  }

  return `${API_BASE_URL}/vehicles?${queryParams.toString()}`;
};

const flattenVehicles = (pages: readonly TVehiclesPage[]): TVehicle[] => {
  const vehicles: TVehicle[] = [];

  for (const page of pages) {
    vehicles.push(...page.data);
  }

  return vehicles;
};

async function fetchVehiclesPage(
  page: number,
  filterType: EVehiclesFilterType,
): Promise<TVehiclesPage> {
  const endpoint: string = createVehiclesEndpoint(page, filterType);
  const response: Response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Vehicles request failed with status ${response.status}`);
  }

  const apiPage: TVehiclesPage = await response.json();

  await delay(FAKE_PAGE_DELAY_MS);

  return apiPage;
}

export function useVehiclesInfiniteQuery(
  filterType: EVehiclesFilterType = EVehiclesFilterType.ALL,
) {
  return useInfiniteQuery<
    TVehiclesPage,
    Error,
    TVehiclesInfiniteSelectedData,
    TVehiclesInfiniteQueryKey,
    number
  >({
    queryKey: buildVehiclesInfiniteQueryKey(filterType),
    queryFn: ({ pageParam }: { pageParam: number }) => fetchVehiclesPage(pageParam, filterType),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TVehiclesPage): number | undefined => lastPage.next ?? undefined,
    staleTime: VEHICLES_QUERY_STALE_TIME_MS,
    maxPages: VEHICLES_MAX_CACHED_PAGES,
    select: (data: TVehiclesInfiniteQueryData): TVehiclesInfiniteSelectedData => {
      const vehicles: TVehicle[] = flattenVehicles(data.pages);

      return {
        ...data,
        vehicles,
        featuredVehicle: vehicles[0] ?? null,
        totalItems: data.pages[0]?.items ?? 0,
      };
    },
  });
}
