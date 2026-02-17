import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { TVehicle } from '@shared/types';
import { BrandColors } from '@/src/theme/BrandColors';
import { formatCurrency, formatMileage, formatAuctionDate } from '@/src/utils/formatters';

type TVehicleDetailsItemProps = {
  vehicle: TVehicle;
};

export function VehicleDetailsItem({ vehicle }: TVehicleDetailsItemProps) {
  const bidLabel: string = formatCurrency(vehicle.startingBid);
  const mileageLabel: string = formatMileage(vehicle.mileage);
  const auctionDateLabel: string = formatAuctionDate(vehicle.auctionDateTime);

  return (
    <View style={styles.card}>
      <VehicleMainTitle vehicle={vehicle} />

      <View style={styles.miniSpecsRow}>
        <VehicleMiniSpec label="MAKE" value={vehicle.make} />
        <VehicleMiniSpec label="FUEL" value={vehicle.fuel} />
        <VehicleMiniSpec label="ENGINE" value={vehicle.engineSize} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>VIN DECODED SPECS</Text>
        <View style={styles.infoBadge}>
          <Text style={styles.infoBadgeText}>i</Text>
        </View>
      </View>

      <View style={styles.verifyCard}>
        <VehicleVerifyRow text="FRAME INTEGRITY: Verified" />
        <VehicleVerifyRow text="PAINT METRIC: Verified" />
        <VehicleVerifyRow text="SERVICE HISTORY: Original" />
        <VehicleVerifyRow text="FULL RECORDS: Available" />
      </View>

      <View style={styles.bidRow}>
        <Text style={styles.bidRowText}>MILEAGE {mileageLabel}</Text>
        <Text style={styles.bidRowText}>{bidLabel}</Text>
      </View>

      <View style={styles.metaCard}>
        <VehicleMetaRow label="Auction date" value={auctionDateLabel} />
        <VehicleMetaFavoriteRow favorite={vehicle.favourite} />
      </View>
    </View>
  );
}

//---------------
// Vehicle name as main title
// Keeps first visual block prominent
//---------------
const VehicleMainTitle = ({ vehicle }: TVehicleDetailsItemProps) => (
  <Text style={styles.title}>
    {vehicle.year} {vehicle.make} {vehicle.model}
  </Text>
);

type TVehicleMiniSpecProps = {
  label: string;
  value: string;
};

//---------------
// Compact top specification cell
// Reusable by different detail cards
//---------------
const VehicleMiniSpec = ({ label, value }: TVehicleMiniSpecProps) => (
  <View style={styles.miniSpecPill}>
    <Text style={styles.miniSpecLabel}>{label}</Text>
    <Text style={styles.miniSpecValue}>{value}</Text>
  </View>
);

type TVehicleVerifyRowProps = {
  text: string;
};

//---------------
// Verification checklist row
// Keeps decoded spec list consistent
//---------------
const VehicleVerifyRow = ({ text }: TVehicleVerifyRowProps) => (
  <View style={styles.verifyRow}>
    <View style={styles.verifyDot} />
    <Text style={styles.verifyText}>{text}</Text>
  </View>
);

type TVehicleMetaRowProps = {
  label: string;
  value: string;
};

type TVehicleMetaFavoriteRowProps = {
  favorite: boolean;
};

//---------------
// Bottom metadata row
// Organizes operational info lines
//---------------
const VehicleMetaRow = ({ label, value }: TVehicleMetaRowProps) => {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
};

//---------------
// Favorite row with icon-only status
// Keeps state legible without extra text
//---------------
const VehicleMetaFavoriteRow = ({ favorite }: TVehicleMetaFavoriteRowProps) => (
  <View style={styles.metaRow}>
    <Text style={styles.metaLabel}>Favorite</Text>
    <Ionicons
      name={favorite ? 'star' : 'star-outline'}
      size={16}
      color={favorite ? BrandColors.warning : BrandColors.textMuted}
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    borderRadius: 16,
    padding: 14,
    backgroundColor: BrandColors.surface,
    gap: 12,
  },
  title: {
    color: BrandColors.textPrimary,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  miniSpecsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  miniSpecPill: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surfaceStrong,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 2,
  },
  miniSpecLabel: {
    color: BrandColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  miniSpecValue: {
    color: BrandColors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  sectionHeader: {
    borderRadius: 12,
    backgroundColor: '#51545b',
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderTitle: {
    color: BrandColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  infoBadge: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: BrandColors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBadgeText: {
    color: BrandColors.surface,
    fontSize: 13,
    fontWeight: '800',
  },
  verifyCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surfaceStrong,
    padding: 12,
    gap: 10,
  },
  verifyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifyDot: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: BrandColors.success,
  },
  verifyText: {
    color: BrandColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  bidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidRowText: {
    color: BrandColors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  metaCard: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    borderRadius: 12,
    backgroundColor: BrandColors.surfaceStrong,
    padding: 10,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    color: BrandColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  metaValue: {
    color: BrandColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
  },
});
