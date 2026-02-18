import { useLocalSearchParams } from 'expo-router';
import { Skeleton } from 'moti/skeleton';

import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useVehicleQuery } from '@/src/utils/api/queries';
import { VehicleDetailsItem } from '@/src/components/VehicleDetailsItem';
import { BrandColors } from '@/src/theme/BrandColors';

type TVehicleRouteParams = {
  id: string;
};

export default function VehicleDetailsScreen() {
  const { id: vehicleId }: TVehicleRouteParams = useLocalSearchParams<TVehicleRouteParams>();

  const { data, isLoading, isError } = useVehicleQuery(vehicleId);

  if (!vehicleId) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Invalid vehicle ID.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <VehicleDetailsSkeleton />
      </SafeAreaView>
    );
  }

  if (isError || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Failed to load vehicle details.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: data.image }} style={styles.image} resizeMode="cover" />
        <VehicleDetailsItem vehicle={data} />
      </ScrollView>
    </SafeAreaView>
  );
}

const VehicleDetailsSkeleton = () => (
  <ScrollView contentContainerStyle={styles.skeletonContent}>
    <Skeleton colorMode="dark" width="100%" height={220} radius={10} />

    <View style={styles.skeletonCard}>
      <View style={styles.skeletonTitle}>
        <Skeleton colorMode="dark" width="64%" height={28} radius={6} />
      </View>

      {Array.from({ length: 7 }, (_value: unknown, index: number) => (
        <View key={`vehicle-details-skeleton-row-${index}`} style={styles.skeletonRow}>
          <Skeleton colorMode="dark" width="25%" height={18} radius={6} />
          <Skeleton colorMode="dark" width="45%" height={18} radius={6} />
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    backgroundColor: BrandColors.surfaceMuted,
  },
  skeletonContent: {
    padding: 16,
    gap: 12,
  },
  skeletonCard: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    borderRadius: 10,
    padding: 14,
    backgroundColor: BrandColors.surface,
    gap: 12,
  },
  skeletonTitle: {
    marginBottom: 2,
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
});
