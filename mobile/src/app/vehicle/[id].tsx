import { useLocalSearchParams } from 'expo-router';
import { ReactElement } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useVehicleQuery } from '../../utils/api/queries';

type TVehicleRouteParams = {
  id?: string | string[];
};

export default function VehicleDetailsScreen(): ReactElement {
  const params: TVehicleRouteParams = useLocalSearchParams<TVehicleRouteParams>();
  const vehicleId: string = getVehicleIdParam(params.id);
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
        <View style={styles.center}>
          <ActivityIndicator size="small" />
        </View>
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

        <View style={styles.card}>
          <Text style={styles.title}>
            {data.make} {data.model}
          </Text>

          <DetailRow label="Year" value={`${data.year}`} />
          <DetailRow label="Engine" value={data.engineSize} />
          <DetailRow label="Fuel" value={data.fuel} />
          <DetailRow label="Mileage" value={`${data.mileage} km`} />
          <DetailRow label="Starting Bid" value={`$${data.startingBid}`} />
          <DetailRow label="Auction" value={data.auctionDateTime} />
          <DetailRow label="Favorite" value={data.favourite ? 'Yes' : 'No'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getVehicleIdParam(idParam: string | string[] | undefined): string {
  if (typeof idParam === 'string') {
    return idParam;
  }

  if (Array.isArray(idParam) && idParam.length > 0) {
    return idParam[0];
  }

  return '';
}

type TDetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: TDetailRowProps): ReactElement {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

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
});
