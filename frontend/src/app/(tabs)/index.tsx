import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useMemo, useEffect } from 'react';

import { SafeAreaView, StyleSheet, View } from 'react-native';

import { FilterModal } from '@/src/components/FilterModal';
import { ErrorComponent } from '@/src/components/ErrorComponent';
import { VehicleList } from '@/src/components/VehicleList';
import { GridSkeleton } from '@/src/components/skeletons/GridSkeleton';
import { HomeFeedHeader } from '@/src/components/HomeFeedHeader';
import { AppRoutes } from '@/src/utils/const';
import { useVehiclesInfiniteQuery } from '@/src/utils/api/queries/useVehiclesInfiniteQuery';
import {
  useVehiclesSearchQuery,
  isSearchEnabled,
} from '@/src/utils/api/queries/useVehiclesSearchQuery';
import { useSearchStore } from '@/src/stores/searchStore';
import { useShallow } from 'zustand/shallow';
import { BrandColors, SKELETON_START, SKELETON_END } from '@/src/theme/BrandColors';
import { TVehicle } from '@shared/types';

export default function HomeScreen() {
  const router = useRouter();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const { searchQuery, selectedMake, selectedYear, selectedPriceRange } = useSearchStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      selectedMake: state.selectedMake,
      selectedYear: state.selectedYear,
      selectedPriceRange: state.selectedPriceRange,
    })),
  );

  const { clearAllFilters } = useSearchStore.getState();

  const currentSearchEnabled = useMemo(
    () =>
      isSearchEnabled({
        searchQuery,
        make: selectedMake,
        year: selectedYear,
        priceRange: selectedPriceRange,
      }),
    [searchQuery, selectedMake, selectedYear, selectedPriceRange],
  );

  const mainQuery = useVehiclesInfiniteQuery();
  const searchQueryResult = useVehiclesSearchQuery({
    searchQuery,
    make: selectedMake,
    year: selectedYear,
    priceRange: selectedPriceRange,
  });

  const vehicles: TVehicle[] = currentSearchEnabled
    ? searchQueryResult.data || []
    : mainQuery.data?.vehicles || [];

  const isLoading = currentSearchEnabled ? searchQueryResult.isLoading : mainQuery.isLoading;
  const isError = currentSearchEnabled ? searchQueryResult.isError : mainQuery.isError;
  const refetch = currentSearchEnabled ? searchQueryResult.refetch : mainQuery.refetch;

  const openVehicle = (vehicleId: string): void => {
    router.push({ pathname: AppRoutes.DETAIL_PATH, params: { id: vehicleId } });
  };

  const headerComponent = <HomeFeedHeader onFilterPress={() => setIsFilterModalVisible(true)} />;

  useEffect(() => {
    return () => {
      clearAllFilters();
    };
  }, [clearAllFilters]);

  if (isLoading) {
    return <GridSkeleton isHomePage />;
  }

  if (isError) {
    return <ErrorComponent onRetry={refetch} />;
  }

  return (
    <LinearGradient
      colors={BrandColors.backgroundGradient}
      locations={BrandColors.backgroundGradientLocations}
      start={SKELETON_START}
      end={SKELETON_END}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <FilterModal
          visible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
        />
        <View style={styles.content}>
          <VehicleList
            data={vehicles}
            onVehiclePress={openVehicle}
            ListHeaderComponent={headerComponent}
            onEndReached={() => {
              if (!currentSearchEnabled && mainQuery.hasNextPage && !mainQuery.isFetchingNextPage) {
                void mainQuery.fetchNextPage();
              }
            }}
            isFetchingNextPage={mainQuery.isFetchingNextPage}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
});
