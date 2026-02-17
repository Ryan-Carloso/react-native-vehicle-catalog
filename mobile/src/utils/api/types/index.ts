import { TVehicle } from '@shared/types';

import { EVehiclesFilterType } from '@/src/utils/api/const';

export type TVehiclesInfiniteQueryKeyMetadata = {
  pageSize: number;
  filterType: EVehiclesFilterType;
};

export type TVehiclesPage = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: TVehicle[];
};

export type TVehiclesInfiniteQueryKey = readonly [
  'vehicles',
  'infinite',
  TVehiclesInfiniteQueryKeyMetadata,
];
