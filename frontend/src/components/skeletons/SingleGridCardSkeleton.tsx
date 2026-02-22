import { Skeleton } from 'moti/skeleton';

import { StyleSheet, View } from 'react-native';

export const SingleGridCardSkeleton = () => (
  <View style={styles.gridCard}>
    <View>
      <View style={styles.imagePlaceholder}>
        <Skeleton colorMode="light" width="100%" height="100%" radius={0} />
      </View>
    </View>
    <View style={styles.titleContainer}>
      <Skeleton colorMode="light" width="80%" height={16} radius={0} />
    </View>
    <View style={styles.subtitleContainer}>
      <Skeleton colorMode="light" width="54%" height={12} radius={0} />
    </View>
    <View style={styles.priceContainer}>
      <Skeleton colorMode="light" width="40%" height={18} radius={0} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  gridCard: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#2A2A2D',
    marginTop: 10,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1.5,
  },
  titleContainer: {
    marginTop: 8,
  },
  subtitleContainer: {
    marginTop: 2,
  },
  priceContainer: {
    marginTop: 8,
  },
});
