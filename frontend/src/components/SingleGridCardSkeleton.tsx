import { StyleSheet, View } from 'react-native';
import { Skeleton } from 'moti/skeleton';

export const SingleGridCardSkeleton = () => (
  <View style={styles.gridCard}>
    <Skeleton colorMode="light" width="100%" height={100} radius={0} />
    <Skeleton colorMode="light" width="80%" height={8} radius={0} />
    <Skeleton colorMode="light" width="54%" height={8} radius={0} />
    <Skeleton colorMode="light" width="40%" height={14} radius={0} />
  </View>
);

const styles = StyleSheet.create({
  gridCard: {
    gap: 12,
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 8,
    borderRadius: 0,
  },
});
