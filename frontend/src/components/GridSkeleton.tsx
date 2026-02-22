import { Skeleton } from 'moti/skeleton';

import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { nanoid } from 'nanoid/non-secure';
import { LinearGradient } from 'expo-linear-gradient';

const SingleGridCardSkeleton = () => (
  <View style={styles.gridCard}>
    <Skeleton colorMode="light" width="100%" height={100} radius={0} />
    <Skeleton colorMode="light" width="80%" height={8} radius={0} />
    <Skeleton colorMode="light" width="54%" height={8} radius={0} />
    <Skeleton colorMode="light" width="40%" height={14} radius={0} />
  </View>
);

const SkeletonHeader = ({ isHomePage }: { isHomePage?: boolean }) => {
  if (!isHomePage) return null;

  return (
    <View style={styles.headerContainer}>
      <Skeleton colorMode="light" width={'100%'} height={130} radius={0} />
    </View>
  );
};

export const GridSkeleton = ({ isHomePage }: { isHomePage?: boolean }) => {
  const rowKeys = Array.from({ length: 3 }, () => nanoid());

  return (
    <LinearGradient
      colors={['#232326', '#141416', '#0a0a0b']}
      locations={[0, 0.45, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.skeletonContainer}>
        <SkeletonHeader isHomePage={isHomePage} />
        {rowKeys.map((rowKey) => (
          <View key={rowKey} style={styles.gridRow}>
            <SingleGridCardSkeleton />
            <SingleGridCardSkeleton />
          </View>
        ))}
      </SafeAreaView>
    </LinearGradient>
  );
};

export const GridNextPageSkeleton = () => {
  const rowKeys = Array.from({ length: 3 }, () => nanoid());

  return (
    <View style={styles.nextPageLoading}>
      {rowKeys.map((rowKey) => (
        <View key={rowKey} style={styles.gridRow}>
          <SingleGridCardSkeleton />
          <SingleGridCardSkeleton />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    marginTop: 10,
    gap: 4,
    paddingHorizontal: 8,
  },
  headerContainer: {
    paddingHorizontal: 4,
    marginBottom: 6,
  },
  nextPageLoading: {
    paddingVertical: 14,
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCard: {
    gap: 12,
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 8,
    borderRadius: 0,
  },
});
