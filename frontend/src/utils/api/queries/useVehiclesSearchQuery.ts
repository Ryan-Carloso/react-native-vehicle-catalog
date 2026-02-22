import { useQuery } from '@tanstack/react-query';
import type { TVehicle, TVehicleMake } from '@shared/types';

import { VEHICLES_QUERY_STALE_TIME_MS } from '@/src/utils/api/const';
import { delay } from '@/src/utils/api/mockup-delay';
import { API_BASE_URL } from '@/src/utils/const';

type TVehiclesSearchParams = {
  searchQuery: string;
  make?: TVehicleMake | 'All';
  year?: string;
  priceRange?: string;
};

type TVehiclesSearchQueryKey = readonly [
  'vehicles',
  'search',
  {
    searchQuery: string;
    make?: TVehicleMake | 'All';
    year?: string;
    priceRange?: string;
  },
];

const buildSearchQueryKey = (params: TVehiclesSearchParams): TVehiclesSearchQueryKey => {
  return [
    'vehicles',
    'search',
    {
      searchQuery: params.searchQuery,
      make: params.make,
      year: params.year,
      priceRange: params.priceRange,
    },
  ];
};

const parseYearRange = (yearStr: string): { min?: number; max?: number } => {
  const year = parseInt(yearStr);
  if (!isNaN(year)) {
    return { min: year, max: year };
  }
  return {};
};

const parsePriceRange = (priceStr: string): { min?: number; max?: number } => {
  const rangeMatch = priceStr.match(/(\d+)(k)?\s*-\s*(\d+)(k)?/);
  if (rangeMatch !== null) {
    const min = rangeMatch[2] ? parseInt(rangeMatch[1]) * 1000 : parseInt(rangeMatch[1]);
    const max = rangeMatch[4] ? parseInt(rangeMatch[3]) * 1000 : parseInt(rangeMatch[3]);
    return { min, max };
  }

  const minMatch = priceStr.match(/(\d+)(k)\s*\+/);
  if (minMatch !== null) {
    const min = parseInt(minMatch[1]) * 1000;
    return { min };
  }
  return {};
};

const createSearchEndpoint = (): string => {
  if (!API_BASE_URL) {
    throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');
  }

  return `${API_BASE_URL}/vehicles`;
};

async function fetchSearchVehicles(params: TVehiclesSearchParams): Promise<TVehicle[]> {
  const endpoint: string = createSearchEndpoint();
  const response: Response = await fetch(endpoint);

  if (!response.ok) {
    console.error('[SearchQuery] Request failed:', response.status);
    throw new Error(`Search vehicles request failed with status ${response.status}`);
  }

  const allVehicles: TVehicle[] = await response.json();

  // Client-side filtering
  // In a real production environment, we would use a proper search index eg postgress index search
  // JSON Server doesn't support advanced search/filtering efficiently, so we fetch all data and filter client-side.

  const searchQuery = params.searchQuery?.trim().toLowerCase() || '';
  const makeFilter = params.make && params.make !== 'All' ? params.make : null;
  const yearRange = parseYearRange(params.year || '');
  const priceRange = parsePriceRange(params.priceRange || '');

  const filteredVehicles = allVehicles.filter((vehicle: TVehicle) => {
    // 1. Search Query
    if (searchQuery.length > 0) {
      const searchableText = `${vehicle.make} ${vehicle.model} ${vehicle.year}`.toLowerCase();
      if (!searchableText.includes(searchQuery)) {
        return false;
      }
    }

    // 2. Make
    if (makeFilter && vehicle.make !== makeFilter) {
      return false;
    }

    // 3. Year
    if (yearRange.min !== undefined && vehicle.year < yearRange.min) {
      return false;
    }
    if (yearRange.max !== undefined && vehicle.year > yearRange.max) {
      return false;
    }

    // 4. Price
    if (priceRange.min !== undefined && vehicle.startingBid < priceRange.min) {
      return false;
    }
    if (priceRange.max !== undefined && vehicle.startingBid > priceRange.max) {
      return false;
    }

    return true;
  });

  await delay();
  return filteredVehicles;
}

export const isSearchEnabled = (params: TVehiclesSearchParams): boolean => {
  return !!(
    params.searchQuery ||
    (params.make && params.make !== 'All') ||
    params.year ||
    params.priceRange
  );
};

export function useVehiclesSearchQuery(params: TVehiclesSearchParams) {
  return useQuery<TVehicle[], Error>({
    queryKey: buildSearchQueryKey(params),
    queryFn: () => fetchSearchVehicles(params),
    staleTime: VEHICLES_QUERY_STALE_TIME_MS,
    enabled: isSearchEnabled(params),
  });
}
