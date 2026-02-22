import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';

type TIoniconName = ComponentProps<typeof Ionicons>['name'];

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export enum AppRoutes {
  TABS = '(tabs)',
  HOME = 'index',
  FAVORITES = 'Favorites',
  MY_BIDS = 'MyBids',
  DETAIL = 'detail/[id]',
  DETAIL_PATH = '/detail/[id]',
}

export type ScreenConfig = {
  name: string;
  title: string;
  iconName: TIoniconName;
};

export const SCREENS: ScreenConfig[] = [
  { name: AppRoutes.HOME, title: 'Home', iconName: 'home-outline' },
  { name: AppRoutes.FAVORITES, title: 'Favorites', iconName: 'star-outline' },
  { name: AppRoutes.MY_BIDS, title: 'My Bids', iconName: 'bookmark-outline' },
];

export const FILTER_MAKES = ['Toyota', 'BMW', 'Ford', 'Honda'];
export const FILTER_YEARS = ['2024', '2023', '2022', 'Old timers'];
export const FILTER_PRICES = ['$0 - $10k', '$10k - $30k', '$30k+'];
