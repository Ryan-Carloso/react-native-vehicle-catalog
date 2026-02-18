import { Skeleton } from 'moti/skeleton';
import { nanoid } from 'nanoid/non-secure';

import { StyleSheet, View } from 'react-native';
import { BrandColors } from 'src/theme/BrandColors';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreenNextPageSkeleton = () => (
  <View style={styles.nextPageLoading}>
    <HomeVehicleCardSkeleton />
  </View>
);

export const HomeScreenSkeleton = () => (
  <SafeAreaView style={styles.skeletonContainer}>
    <View style={styles.skeletonList}>{renderHomeVehicleCardSkeletons(3)}</View>

    <View style={styles.skeletonBottom}>
      <Skeleton colorMode="dark" width={180} height={16} radius={6} />
    </View>
  </SafeAreaView>
);

function renderHomeVehicleCardSkeletons(repetitions: number): React.ReactNode[] {
  return Array.from({ length: repetitions }, () => <HomeVehicleCardSkeleton key={nanoid()} />);
}

const HomeVehicleCardSkeleton = () => (
  <View style={styles.nextPageSkeletonCard}>
    <Skeleton colorMode="dark" width="100%" height={170} radius={8} />
    <View style={styles.skeletonMetaRow}>
      <Skeleton colorMode="dark" width="52%" height={22} radius={6} />
    </View>
    <View style={styles.skeletonMetaRow}>
      <Skeleton colorMode="dark" width="78%" height={18} radius={6} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    backgroundColor: BrandColors.background,
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
  nextPageLoading: {
    paddingVertical: 14,
  },
  nextPageSkeletonCard: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: BrandColors.surfaceStrong,
  },
});
