import { Skeleton } from 'moti/skeleton';

import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BrandColors, SKELETON_START, SKELETON_END } from '@/src/theme/BrandColors';

export const SingleGridCardSkeleton = () => (
  <View style={styles.gridCardContainer}>
    <LinearGradient
      colors={BrandColors.cardGradient}
      locations={BrandColors.cardGradientLocations}
      start={SKELETON_START}
      end={SKELETON_END}
      style={styles.gridCard}
    >
      <View style={styles.imagePlaceholder}>
        <Skeleton colorMode="light" width="100%" height="100%" radius={0} />
      </View>
      <Skeleton colorMode="light" width="80%" height={16} radius={0} />
      <Skeleton colorMode="light" width="54%" height={12} radius={0} />
      <Skeleton colorMode="light" width="40%" height={18} radius={0} />
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  gridCardContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gridCard: {
    gap: 12,
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#2A2A2D',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1.5,
  },
});
