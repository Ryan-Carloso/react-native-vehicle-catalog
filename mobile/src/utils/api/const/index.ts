export enum EVehiclesFilterType {
  ALL = 'ALL',
  MY_BIDS = 'MY_BIDS',
  MY_FAVORITES = 'MY_FAVORITES',
}

export const VEHICLES_PAGE_SIZE: number = 10;
export const VEHICLES_QUERY_STALE_TIME_MS: number = 60_000;
export const VEHICLES_MAX_CACHED_PAGES: number = 6;
