import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { nanoid } from 'nanoid/non-secure';
import { ReactElement, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TVehicle, TVehicleMakeFilter, VEHICLE_MAKE_FILTER_OPTIONS } from '@shared/types';
import { useVehiclesInfiniteQuery } from '../../utils/api/queries';

export default function HomeScreen(): ReactElement {
  const router = useRouter();
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useVehiclesInfiniteQuery();
  const [selectedMake, setSelectedMake] = useState<TVehicleMakeFilter>('All');

  const allVehicles: TVehicle[] = useMemo((): TVehicle[] => {
    if (!data) {
      return [];
    }

    return data.pages.flatMap((page: { items: TVehicle[] }): TVehicle[] => page.items);
  }, [data]);

  const filteredVehicles: TVehicle[] = useMemo((): TVehicle[] => {
    if (selectedMake === 'All') {
      return allVehicles;
    }

    return allVehicles.filter((vehicle: TVehicle): boolean => vehicle.make === selectedMake);
  }, [allVehicles, selectedMake]);

  const totalItems: number = data?.pages[0]?.total ?? 0;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <HomeScreenSkeleton />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Failed to load vehicles.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlashList
          data={VEHICLE_MAKE_FILTER_OPTIONS}
          horizontal
          keyExtractor={(item: TVehicleMakeFilter): string => item}
          renderItem={({ item }: ListRenderItemInfo<TVehicleMakeFilter>) => (
            <Pressable
              style={[
                styles.filterButton,
                item === selectedMake ? styles.filterButtonActive : null,
              ]}
              onPress={() => setSelectedMake(item)}
            >
              <Text
                style={[styles.filterText, item === selectedMake ? styles.filterTextActive : null]}
              >
                {item}
              </Text>
            </Pressable>
          )}
          contentContainerStyle={styles.filterListContent}
          showsHorizontalScrollIndicator={false}
        />

        <FlashList
          data={filteredVehicles}
          keyExtractor={(item: TVehicle): string => item.id}
          renderItem={({ item }: ListRenderItemInfo<TVehicle>): ReactElement => (
            <Pressable
              onPress={() => router.push({ pathname: '/vehicle/[id]', params: { id: item.id } })}
              style={styles.card}
            >
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
              <Text style={styles.title}>
                {item.make} {item.model}
              </Text>
              <Text style={styles.meta}>
                {item.year} • {item.engineSize} • {item.fuel} • ${item.startingBid}
              </Text>
            </Pressable>
          )}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              void fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.6}
          ListFooterComponent={isFetchingNextPage ? <HomeScreenNextPageSkeleton /> : null}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.bottomInfo}>
          <Text style={styles.bottomInfoText}>
            {filteredVehicles.length} cars found of {totalItems} total
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const HomeScreenNextPageSkeleton = (): ReactElement => (
  <View style={styles.nextPageLoading}>
    <HomeVehicleCardSkeleton />
  </View>
);

const HomeScreenSkeleton = (): ReactElement => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonFilterRow}>
      <Skeleton colorMode="light" width={60} height={36} radius={999} />
      <Skeleton colorMode="light" width={74} height={36} radius={999} />
      <Skeleton colorMode="light" width={86} height={36} radius={999} />
      <Skeleton colorMode="light" width={78} height={36} radius={999} />
    </View>

    <View style={styles.skeletonList}>{renderHomeVehicleCardSkeletons(3)}</View>

    <View style={styles.skeletonBottom}>
      <Skeleton colorMode="light" width={180} height={16} radius={6} />
    </View>
  </View>
);

const HomeVehicleCardSkeleton = (): ReactElement => (
  <View style={styles.nextPageSkeletonCard}>
    <Skeleton colorMode="light" width="100%" height={170} radius={8} />
    <View style={styles.skeletonMetaRow}>
      <Skeleton colorMode="light" width="52%" height={22} radius={6} />
    </View>
    <View style={styles.skeletonMetaRow}>
      <Skeleton colorMode="light" width="78%" height={18} radius={6} />
    </View>
  </View>
);

function renderHomeVehicleCardSkeletons(repetitions: number): ReactElement[] {
  return Array.from(
    { length: repetitions },
    (): ReactElement => <HomeVehicleCardSkeleton key={nanoid()} />,
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterListContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
  filterButtonActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  filterText: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  nextPageLoading: {
    paddingVertical: 14,
  },
  nextPageSkeletonCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  bottomInfo: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  bottomInfoText: {
    color: '#4b5563',
    fontSize: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  meta: {
    marginTop: 4,
    fontSize: 14,
    color: '#4b5563',
  },
  skeletonContainer: {
    flex: 1,
  },
  skeletonFilterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skeletonList: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  skeletonMetaRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonBottom: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginTop: 4,
  },
});
