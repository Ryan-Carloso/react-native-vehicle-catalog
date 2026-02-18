import { Skeleton } from 'moti/skeleton';
import type { ReactElement } from 'react';

import { StyleSheet, View } from 'react-native';
import { BrandColors } from '@/src/theme/BrandColors';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreenNextPageSkeleton = ({
  isFetchingNextPage,
}: {
  isFetchingNextPage: boolean;
}) => {
  if (!isFetchingNextPage) return null;

  return (
    <View style={styles.nextPageLoading}>
      <View style={styles.gridRow}>
        <HomeGridCardSkeleton />
        <HomeGridCardSkeleton />
      </View>
    </View>
  );
};

export const HomeScreenSkeleton = () => (
  <SafeAreaView style={styles.skeletonContainer}>
    <View style={styles.headerContainer}>
      <Skeleton colorMode="dark" width={128} height={128} radius={24} />
      <Skeleton colorMode="dark" width={96} height={3} radius={999} />
      <Skeleton colorMode="dark" width={220} height={36} radius={8} />
    </View>

    <HomeFeaturedCardSkeleton />

    <View style={styles.gridSection}>{renderHomeGridRows(2)}</View>
  </SafeAreaView>
);

function renderHomeGridRows(rowCount: number): ReactElement[] {
  return Array.from({ length: rowCount }, (_, index: number) => (
    <View key={`home-grid-row-${index}`} style={styles.gridRow}>
      <HomeGridCardSkeleton />
      <HomeGridCardSkeleton />
    </View>
  ));
}

const HomeFeaturedCardSkeleton = () => (
  <View style={styles.featuredCard}>
    <Skeleton colorMode="dark" width="100%" height={228} radius={16} />

    <View style={styles.featuredMetaRow}>
      <Skeleton colorMode="dark" width={140} height={30} radius={8} />
      <Skeleton colorMode="dark" width={100} height={30} radius={8} />
    </View>

    <View style={styles.featuredInfoRow}>
      <Skeleton colorMode="dark" width={130} height={26} radius={8} />
      <Skeleton colorMode="dark" width={170} height={44} radius={10} />
    </View>

    <View style={styles.featuredInfoRow}>
      <Skeleton colorMode="dark" width={150} height={34} radius={8} />
      <Skeleton colorMode="dark" width={70} height={26} radius={8} />
    </View>
  </View>
);

const HomeGridCardSkeleton = () => (
  <View style={styles.gridCard}>
    <Skeleton colorMode="dark" width="100%" height={94} radius={10} />
    <Skeleton colorMode="dark" width="80%" height={8} radius={8} />
    <Skeleton colorMode="dark" width="54%" height={8} radius={8} />
    <Skeleton colorMode="dark" width="40%" height={14} radius={4} />
  </View>
);

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    backgroundColor: BrandColors.background,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 6,
    gap: 12,
  },
  featuredCard: {
    marginTop: 14,
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surfaceStrong,
  },
  featuredMetaRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredInfoRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridSection: {
    marginTop: 10,
    gap: 10,
  },
  nextPageLoading: {
    paddingVertical: 14,
  },
  gridRow: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  gridCard: {
    gap: 4,
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surfaceStrong,
  },
});
