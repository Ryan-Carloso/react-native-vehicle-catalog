import { useLocalSearchParams, useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppScreenHeader } from '@/src/components/AppScreenHeader';
import { ErrorComponent } from '@/src/components/ErrorComponent';
import { VehicleDetailsItem } from '@/src/components/VehicleDetailsItem';
import { VehicleHeroImage } from '@/src/components/VehicleHeroImage';
import { useVehicleQuery } from '@/src/utils/api/queries';
import { BrandColors } from '@/src/theme/BrandColors';

type TVehicleRouteParams = {
  id?: string;
};

export default function VehicleDetailsScreen() {
  const router = useRouter();
  const { id }: TVehicleRouteParams = useLocalSearchParams<TVehicleRouteParams>();
  const vehicleId: string = typeof id === 'string' ? id : '';
  const { isLoading, isError, data } = useVehicleQuery(vehicleId);

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
    return <ErrorComponent />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppScreenHeader onBackPress={() => router.back()} />
        <VehicleHeroImage imageUrl={data.image} />

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
      <Skeleton colorMode="dark" width={42} height={42} radius={21} />
      <Skeleton colorMode="dark" width={120} height={44} radius={8} />
      <Skeleton colorMode="dark" width={42} height={42} radius={21} />
    </View>

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
    gap: 14,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidButton: {
    borderRadius: 10,
    paddingVertical: 12,
    backgroundColor: BrandColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidButtonText: {
    color: BrandColors.textPrimary,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: 0.8,
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
