import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorComponent } from '@/src/components/ErrorComponent';
import { GridSkeleton } from '@/src/components/skeletons/GridSkeleton';
import { VehicleList } from '@/src/components/VehicleList';
import { BrandColors } from '@/src/theme/BrandColors';
import { EVehiclesFilterType } from '@/src/utils/api/const';
import { useVehiclesInfiniteQuery } from '@/src/utils/api/queries/useVehiclesInfiniteQuery';
import { AppRoutes } from '@/src/utils/const';

const MyBidsScreen = () => {
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
      <VehicleList
        data={data?.vehicles ?? []}
        onVehiclePress={openVehicle}
        ListHeaderComponent={<Text style={styles.title}>My Bids</Text>}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
          }
        }}
        isFetchingNextPage={isFetchingNextPage}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

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

export default MyBidsScreen;
