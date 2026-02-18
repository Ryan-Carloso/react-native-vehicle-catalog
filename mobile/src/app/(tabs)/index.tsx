import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { ErrorComponent } from '@/src/components/ErrorComponent';
import { useRouter } from 'expo-router';

import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeEmptyState } from '@/src/components/EmptyState';
import { TVehicle, TVehicleMakeFilter } from '@shared/types';
import { VehicleListItem } from '@/src/components/VehicleListItem';
import { HomeScreenNextPageSkeleton, HomeScreenSkeleton } from '@/src/components/HomeSkeleton';
import { useVehiclesInfiniteQuery } from '@/src/utils/api/queries';
import { BrandColors } from '@/src/theme/BrandColors';

export default function HomeScreen() {
  const router = useRouter();
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useVehiclesInfiniteQuery();

  const openVehicle = (vehicleId: string): void => {
    router.push({ pathname: '/vehicle/[id]', params: { id: vehicleId } });
  };

  const flatVehicles: TVehicle[] = [];
  data?.pages.forEach((page) => {
    flatVehicles.push(...page.items);
  });

  if (isLoading) {
    return <HomeScreenSkeleton />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  //---------------
  // List header composition
  // Keeps feed sections consistent
  //---------------
  const HomeFeedHeader = () => {
    const featuredVehicle = data?.pages[0].items[0];

    return (
      <View style={styles.heroContainer}>
        <Image source={require('@/assets/icon.png')} style={styles.heroIcon} />
        <View style={styles.heroDivider} />
        <Text style={styles.heroTitle}>JOIN THE HUNT</Text>

        {featuredVehicle && (
          <VehicleListItem
            vehicle={featuredVehicle}
            variant="featured"
            onPress={() => openVehicle(featuredVehicle.id)}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlashList
          data={flatVehicles}
          keyExtractor={(item: TVehicle): string => item.id}
          numColumns={2}
          estimatedItemSize={220}
          renderItem={({ item }: ListRenderItemInfo<TVehicle>) => (
            <VehicleListItem vehicle={item} variant="grid" onPress={() => openVehicle(item.id)} />
          )}
          ListHeaderComponent={HomeFeedHeader}
          ListEmptyComponent={HomeEmptyState}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              void fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            <HomeScreenNextPageSkeleton isFetchingNextPage={isFetchingNextPage} />
          }
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
    alignItems: 'stretch',
  },
  heroCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
    paddingHorizontal: 24,
    paddingVertical: 22,
    alignItems: 'center',
    gap: 12,
  },
  heroIcon: {
    width: 128,
    height: 128,
    alignSelf: 'center',
  },
  heroDivider: {
    width: 96,
    height: 3,
    marginBottom: 6,
    borderRadius: 999,
    backgroundColor: BrandColors.accent,
    alignSelf: 'center',
  },
  heroTitle: {
    color: BrandColors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterListContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  filterSeparator: {
    width: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: BrandColors.surfaceStrong,
  },
  filterButtonActive: {
    backgroundColor: BrandColors.accent,
    borderColor: BrandColors.accent,
  },
  filterText: {
    color: BrandColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: BrandColors.surface,
  },
  spotlightListContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  spotlightSeparator: {
    width: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  bottomInfo: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  bottomInfoText: {
    color: BrandColors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
