export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

// Simulated delay for demonstration; displays loading indicator and renders UI skeleton
export const FAKE_PAGE_DELAY_MS: number = 700;

export enum AppRoutes {
  TABS = '(tabs)',
  HOME = 'index',
  FAVORITES = 'Favorites',
  MY_BIDS = 'MyBids',
  DETAIL = 'detail/[id]',
  DETAIL_PATH = '/detail/[id]',
}
