import { Skeleton } from 'moti/skeleton';

import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { nanoid } from 'nanoid/non-secure';
import { LinearGradient } from 'expo-linear-gradient';
import { SingleGridCardSkeleton } from './SingleGridCardSkeleton';
import { calculateNumColumns } from '../../constants/grid';
import { BrandColors, SKELETON_START, SKELETON_END } from '@/src/theme/BrandColors';

const SkeletonHeader = ({ isHomePage }: { isHomePage?: boolean }) => {
  if (!isHomePage) return null;

  return (
    <View style={styles.headerContainer}>
      <Skeleton colorMode="light" width={'100%'} height={130} radius={0} />
    </View>
  );
};

export const GridSkeleton = ({ isHomePage }: { isHomePage?: boolean }) => {
  const { width } = useWindowDimensions();
  const numColumns = calculateNumColumns(width);
  const skeletons = Array.from({ length: numColumns * 3 }, () => nanoid());

  return (
    <LinearGradient
      colors={BrandColors.backgroundGradient}
      locations={BrandColors.backgroundGradientLocations}
      start={SKELETON_START}
      end={SKELETON_END}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.skeletonContainer}>
        <SkeletonHeader isHomePage={isHomePage} />
        <View style={styles.gridContainer}>
          {skeletons.map(() => (
            <SingleGridCardSkeleton />
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
