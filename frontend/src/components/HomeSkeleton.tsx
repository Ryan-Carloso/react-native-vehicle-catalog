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
      <Skeleton colorMode="light" width={128} height={128} radius={0} />
      <Skeleton colorMode="light" width={96} height={3} radius={0} />
      <Skeleton colorMode="light" width={220} height={36} radius={0} />
    </View>

    <View style={styles.gridSection}>
      <GridCardSkeleton />
    </View>
  </SafeAreaView>
);

const GridCardSkeleton = () => {
  const skeletonKeys = Array.from({ length: 2 }, () => nanoid());

  return (
    <View style={styles.gridRow}>
      {skeletonKeys.map((key) => (
        <View key={key} style={styles.gridCard}>
          <Skeleton colorMode="light" width="100%" height={94} radius={0} />
          <Skeleton colorMode="light" width="80%" height={8} radius={0} />
          <Skeleton colorMode="light" width="54%" height={8} radius={0} />
          <Skeleton colorMode="light" width="40%" height={14} radius={0} />
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
    borderRadius: 0,
    backgroundColor: BrandColors.surfaceStrong,
  },
});
