import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TVehicleMakeFilter } from '@shared/types';

type TSearchFilters = {
  searchQuery: string;
  selectedMake: TVehicleMakeFilter;
  selectedYear: string;
  selectedPriceRange: string;
};

type TSearchStore = TSearchFilters & {
  setSearchQuery: (query: string) => void;
  setMakeFilter: (make: TVehicleMakeFilter) => void;
  setYearFilter: (year: string) => void;
  setPriceFilter: (priceRange: string) => void;
  clearAllFilters: () => void;
  clearFiltersOnly: () => void;
};

export const useSearchStore = create<TSearchStore>()(
  persist(
    (set) => ({
      searchQuery: '',
      selectedMake: 'All',
      selectedYear: '',
      selectedPriceRange: '',

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setMakeFilter: (make: TVehicleMakeFilter) => {
        set({ selectedMake: make });
      },

      setYearFilter: (year: string) => {
        set({ selectedYear: year });
      },

      setPriceFilter: (priceRange: string) => {
        set({ selectedPriceRange: priceRange });
      },

      clearAllFilters: () => {
        set({
          searchQuery: '',
          selectedMake: 'All',
          selectedYear: '',
          selectedPriceRange: '',
        });
      },

      clearFiltersOnly: () => {
        set({
          selectedMake: 'All',
          selectedYear: '',
          selectedPriceRange: '',
        });
      },
    }),
    {
      name: 'search-storage',
      storage: {
        getItem: (name) =>
          AsyncStorage.getItem(name).then((value) => (value ? JSON.parse(value) : null)),
        setItem: (name, value) => AsyncStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => AsyncStorage.removeItem(name),
      },
    },
  ),
);
