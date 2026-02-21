import { useLocalSearchParams, useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';

import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorComponent } from '@/src/components/ErrorComponent';
import { VehicleDetailsItem } from '@/src/components/VehicleDetailsItem';
import { useVehicleDetailQuery } from '@/src/utils/api/queries/useVehicleDetailQuery';
import { BrandColors } from '@/src/theme/BrandColors';
import Ionicons from '@expo/vector-icons/Ionicons';

type TVehicleRouteParams = {
  id?: string;
};

export default function VehicleDetailsScreen() {
  const router = useRouter();
  const { id }: TVehicleRouteParams = useLocalSearchParams<TVehicleRouteParams>();
  const vehicleId: string = typeof id === 'string' ? id : '';
  const { isLoading, isError, data, refetch } = useVehicleDetailQuery(vehicleId);

  if (!vehicleId) {
    return <ErrorComponent message="Invalid vehicle ID." />;
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <VehicleDetailsSkeleton />
      </SafeAreaView>
    );
  }

  if (isError || !data) {
    return <ErrorComponent onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={BrandColors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>
          {data.year} {data.make} {data.model}
        </Text>
        <Image source={{ uri: data.image }} style={styles.image} resizeMode="cover" />
        <VehicleDetailsItem vehicle={data} />

        <Pressable style={styles.bidButton}>
          <Text style={styles.bidButtonText}>PLACE BID</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

//---------------
// Loading placeholders for detail page
// Mirrors final composition without data hooks
//---------------
const VehicleDetailsSkeleton = () => (
  <ScrollView contentContainerStyle={styles.skeletonContent}>
    <View style={styles.skeletonHeader}>
      <Skeleton colorMode="light" width={48} height={48} radius={0} />
      <Skeleton colorMode="light" width={140} height={44} radius={0} />
      <Skeleton colorMode="light" width={48} height={48} radius={0} />
    </View>

    <Skeleton colorMode="light" width="100%" height={220} radius={0} />

    <View style={styles.skeletonCard}>
      <View style={styles.skeletonTitle}>
        <Skeleton colorMode="light" width="64%" height={28} radius={0} />
      </View>

      {Array.from({ length: 7 }, (_value: unknown, index: number) => (
        <View key={`vehicle-details-skeleton-row-${index}`} style={styles.skeletonRow}>
          <Skeleton colorMode="light" width="25%" height={18} radius={0} />
          <Skeleton colorMode="light" width="45%" height={18} radius={0} />
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
    gap: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.background,
  },
  image: {
    width: '100%',
    height: 210,
    backgroundColor: BrandColors.surfaceMuted,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  title: {
    color: BrandColors.textPrimary,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidButton: {
    paddingVertical: 12,
    backgroundColor: BrandColors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidButtonText: {
    color: BrandColors.background,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  skeletonContent: {
    padding: 16,
    gap: 14,
  },
  skeletonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonCard: {
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
