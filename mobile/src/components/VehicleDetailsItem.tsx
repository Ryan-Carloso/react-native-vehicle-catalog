import { StyleSheet, Text, View } from 'react-native';

import { TVehicle } from '@shared/types';
import { BrandColors } from '@/src/theme/BrandColors';

type TVehicleDetailsItemProps = {
  vehicle: TVehicle;
};

export function VehicleDetailsItem({ vehicle }: TVehicleDetailsItemProps) {
  const bidLabel: string = formatCurrency(vehicle.startingBid);
  const mileageLabel: string = formatMileage(vehicle.mileage);
  const auctionDateLabel: string = formatAuctionDate(vehicle.auctionDateTime);

  return (
    <View style={styles.card}>
      <VehicleDetailsHeader vehicle={vehicle} />

      <View style={styles.divider} />

      <VehicleDetailsRow label="Year" value={`${vehicle.year}`} />
      <VehicleDetailsRow label="Engine" value={vehicle.engineSize} />
      <VehicleDetailsRow label="Fuel" value={vehicle.fuel} />
      <VehicleDetailsRow label="Mileage" value={mileageLabel} />
      <VehicleDetailsRow label="Starting bid" value={bidLabel} />
      <VehicleDetailsRow label="Auction date" value={auctionDateLabel} />
    </View>
  );
}

//---------------
// Main title and favorite state
// Keeps header visual hierarchy isolated
//---------------
const VehicleDetailsHeader = ({ vehicle }: TVehicleDetailsItemProps) => (
  <View style={styles.header}>
    <Text style={styles.title}>
      {vehicle.make} {vehicle.model}
    </Text>

    <View style={[styles.favoritePill, vehicle.favourite ? styles.favoritePillActive : null]}>
      <Text
        style={[styles.favoritePillText, vehicle.favourite ? styles.favoritePillTextActive : null]}
      >
        {vehicle.favourite ? 'Favorite' : 'Not favorite'}
      </Text>
    </View>
  </View>
);

type TVehicleDetailsRowProps = {
  label: string;
  value: string;
};

//---------------
// Reusable label/value row
// Avoids repeated markup blocks
//---------------
const VehicleDetailsRow = ({ label, value }: TVehicleDetailsRowProps) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMileage(value: number): string {
  const miles: string = new Intl.NumberFormat('en-US').format(value);

  return `${miles} km`;
}

function formatAuctionDate(value: string): string {
  const date: Date = new Date(value);
  const timestamp: number = date.getTime();

  if (Number.isNaN(timestamp)) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: BrandColors.surface,
    gap: 12,
    shadowColor: BrandColors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: BrandColors.textPrimary,
  },
  favoritePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: BrandColors.surfaceMuted,
  },
  favoritePillActive: {
    backgroundColor: BrandColors.success,
  },
  favoritePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.textSecondary,
  },
  favoritePillTextActive: {
    color: BrandColors.surface,
  },
  divider: {
    height: 1,
    backgroundColor: BrandColors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    color: BrandColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  rowValue: {
    color: BrandColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
});
