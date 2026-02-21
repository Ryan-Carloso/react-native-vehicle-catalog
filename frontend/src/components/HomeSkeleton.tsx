import { Skeleton } from 'moti/skeleton';

import { StyleSheet, View } from 'react-native';
import { BrandColors } from '@/src/theme/BrandColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { nanoid } from 'nanoid/non-secure';

export const GridNextPageSkeleton = ({ isFetchingNextPage }: { isFetchingNextPage: boolean }) => {
  if (!isFetchingNextPage) return null;

  return (
    <View style={styles.nextPageLoading}>
      <View style={styles.gridRow}>
        <GridCardSkeleton />
      </View>
    </View>
  );
};

export const GridSkeleton = () => (
  <SafeAreaView style={styles.skeletonContainer}>
    <View style={styles.headerContainer}>
      <Skeleton colorMode="dark" width={128} height={128} radius={24} />
      <Skeleton colorMode="dark" width={96} height={3} radius={999} />
      <Skeleton colorMode="dark" width={220} height={36} radius={8} />
    </View>

    <HomeFeaturedCardSkeleton />

    <View style={styles.gridSection}>
      <GridCardSkeleton />
    </View>
  </SafeAreaView>
);

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

const GridCardSkeleton = () => {
  const skeletonKeys = Array.from({ length: 2 }, () => nanoid());

  return (
    <View style={styles.gridRow}>
      {skeletonKeys.map((key) => (
        <View key={key} style={styles.gridCard}>
          <Skeleton colorMode="dark" width="100%" height={94} radius={10} />
          <Skeleton colorMode="dark" width="80%" height={8} radius={8} />
          <Skeleton colorMode="dark" width="54%" height={8} radius={8} />
          <Skeleton colorMode="dark" width="40%" height={14} radius={4} />
        </View>
      ))}
    </View>
  );
};

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
