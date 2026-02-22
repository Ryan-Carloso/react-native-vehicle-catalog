import { Skeleton } from 'moti/skeleton';

import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { nanoid } from 'nanoid/non-secure';
import { LinearGradient } from 'expo-linear-gradient';
import { SingleGridCardSkeleton } from './SingleGridCardSkeleton';
import { BrandColors, SKELETON_START, SKELETON_END } from '@/src/theme/BrandColors';
import { useMemo } from 'react';
import { useGridDimensions } from '@/src/constants/grid';

const SkeletonHeader = ({ isHomePage }: { isHomePage?: boolean }) => {
  if (!isHomePage) return null;

  return (
    <View style={styles.headerContainer}>
      <Skeleton colorMode="light" width={'100%'} height={130} radius={0} />
    </View>
  );
};

export const GridSkeleton = ({ isHomePage }: { isHomePage?: boolean }) => {
  const { NUMBER_COLUMNS } = useGridDimensions();

  const data = useMemo(
    () => Array.from({ length: NUMBER_COLUMNS * 3 }, () => nanoid()),
    [NUMBER_COLUMNS],
  );

  return (
    <LinearGradient
      colors={BrandColors.backgroundGradient}
      locations={BrandColors.backgroundGradientLocations}
      start={SKELETON_START}
      end={SKELETON_END}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          key={NUMBER_COLUMNS}
          numColumns={NUMBER_COLUMNS}
          renderItem={() => <SingleGridCardSkeleton />}
          keyExtractor={(item) => item}
          ListHeaderComponent={<SkeletonHeader isHomePage={isHomePage} />}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerContainer: {
    paddingHorizontal: 4,
    marginBottom: 16,
  },
});
