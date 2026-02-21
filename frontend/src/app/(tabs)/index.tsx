import { FlashList } from '@shopify/flash-list';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { ErrorComponent } from '@/src/components/ErrorComponent';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FilterModal } from '@/src/components/FilterModal';
import { HomeEmptyState } from '@/src/components/EmptyState';
import type { TVehicle } from '@shared/types';
import { VehicleListItem } from '@/src/components/VehicleListItem';
import { GridNextPageSkeleton, GridSkeleton } from '@/src/components/HomeSkeleton';
import { AppRoutes } from '@/src/utils/const';
import { useVehiclesInfiniteQuery } from '@/src/utils/api/queries/useVehiclesInfiniteQuery';
import { BrandColors } from '@/src/theme/BrandColors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen() {
  const router = useRouter();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useVehiclesInfiniteQuery();

  const openVehicle = (vehicleId: string): void => {
    router.push({ pathname: AppRoutes.DETAIL_PATH, params: { id: vehicleId } });
  };

  if (isLoading) {
    return <GridSkeleton />;
  }

  if (isError) {
    return <ErrorComponent onRetry={refetch} />;
  }

  //---------------
  // List header composition
  // Keeps feed sections consistent
  //---------------
  const HomeFeedHeader = () => {
    return (
      <View style={styles.heroContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.logoRow}>
            <FontAwesome name="gear" size={24} color={BrandColors.textPrimary} />
            <Text style={styles.heroTitle}>GEAR SHIFT</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={20} color={BrandColors.textMuted} />
            <TextInput
              placeholder="Search vehicles..."
              placeholderTextColor={BrandColors.textMuted}
              style={styles.searchInputField}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <FontAwesome name="filter" size={20} color={BrandColors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FilterModal visible={isFilterModalVisible} onClose={() => setIsFilterModalVisible(false)} />
      <View style={styles.content}>
        <FlashList
          data={data?.vehicles ?? []}
          keyExtractor={(item: TVehicle): string => item.id}
          numColumns={2}
          estimatedItemSize={220}
          renderItem={({ item }: ListRenderItemInfo<TVehicle>) => (
            <VehicleListItem vehicle={item} onPress={() => openVehicle(item.id)} />
          )}
          ListHeaderComponent={HomeFeedHeader}
          ListEmptyComponent={HomeEmptyState}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              void fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.6}
          ListFooterComponent={<GridNextPageSkeleton isFetchingNextPage={isFetchingNextPage} />}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 10,
    gap: 14,
    backgroundColor: BrandColors.backgroundElevated,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heroTitle: {
    color: BrandColors.textPrimary,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.background,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInputField: {
    flex: 1,
    marginLeft: 10,
    color: BrandColors.textPrimary,
    fontSize: 16,
    fontFamily: 'Courier',
    fontWeight: '700',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: BrandColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
});
