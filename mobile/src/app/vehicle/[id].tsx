import { useLocalSearchParams } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { ReactElement } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useVehicleQuery } from '../../utils/api/queries';
import { TVehicle } from '@shared/types';

type TVehicleRouteParams = {
  id: string;
};

export default function VehicleDetailsScreen(): ReactElement {
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
        <DetailRow data={data} />
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({ data }: { data: TVehicle }): ReactElement => (
  <View style={styles.card}>
    <Text style={styles.title}>
      {data.make} {data.model}
    </Text>

    <Text style={styles.rowValue}>{`${data.year}`}</Text>
    <Text style={styles.rowValue}>{data.engineSize}</Text>
    <Text style={styles.rowValue}>{data.fuel}</Text>
    <Text style={styles.rowValue}>{`${data.mileage} km`}</Text>
    <Text style={styles.rowValue}>{`$${data.startingBid}`}</Text>
    <Text style={styles.rowValue}>{data.auctionDateTime}</Text>
    <Text style={styles.rowValue}>{data.favourite ? 'Yes' : 'No'}</Text>
  </View>
);

const VehicleDetailsSkeleton = (): ReactElement => (
  <ScrollView contentContainerStyle={styles.skeletonContent}>
    <Skeleton colorMode="light" width="100%" height={220} radius={10} />

    <View style={styles.skeletonCard}>
      <View style={styles.skeletonTitle}>
        <Skeleton colorMode="light" width="64%" height={28} radius={6} />
      </View>

      {Array.from(
        { length: 7 },
        (_value: unknown, index: number): ReactElement => (
          <View key={`vehicle-details-skeleton-row-${index}`} style={styles.skeletonRow}>
            <Skeleton colorMode="light" width="25%" height={18} radius={6} />
            <Skeleton colorMode="light" width="45%" height={18} radius={6} />
          </View>
        ),
      )}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#f3f4f6',
  },
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#ffffff',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  rowLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  rowValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
  skeletonContent: {
    padding: 16,
    gap: 12,
  },
  skeletonCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#ffffff',
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
