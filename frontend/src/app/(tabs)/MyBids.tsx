import { FlashList } from '@shopify/flash-list';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { useRouter } from 'expo-router';

import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeEmptyState } from '@/src/components/EmptyState';
import { ErrorComponent } from '@/src/components/ErrorComponent';
import { GridNextPageSkeleton, GridSkeleton } from '@/src/components/HomeSkeleton';
import { VehicleListItem } from '@/src/components/VehicleListItem';
import { BrandColors } from '@/src/theme/BrandColors';
import { EVehiclesFilterType } from '@/src/utils/api/const';
import { useVehiclesInfiniteQuery } from '@/src/utils/api/queries/useVehiclesInfiniteQuery';
import { AppRoutes } from '@/src/utils/const';
import type { TVehicle } from '@shared/types';

export default function MyBidsScreen() {
  const router = useRouter();
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useVehiclesInfiniteQuery(EVehiclesFilterType.MY_BIDS);

  const openVehicle = (vehicleId: string): void => {
    router.push({ pathname: AppRoutes.DETAIL_PATH, params: { id: vehicleId } });
  };

  if (isLoading) {
    return <GridSkeleton />;
  }

  if (isError) {
    return <ErrorComponent onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={data?.vehicles ?? []}
        keyExtractor={(item: TVehicle): string => item.id}
        numColumns={2}
        estimatedItemSize={220}
        renderItem={({ item }: ListRenderItemInfo<TVehicle>) => (
          <VehicleListItem vehicle={item} onPress={() => openVehicle(item.id)} />
        )}
        ListHeaderComponent={<Text style={styles.title}>My Bids</Text>}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  title: {
    color: BrandColors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
});
