import { StyleSheet, Text, View } from 'react-native';

import type { TVehicle } from '@shared/types';
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
      <View style={styles.miniSpecsRow}>
        <VehicleMiniSpec label="MAKE" value={vehicle.make} />
        <VehicleMiniSpec label="FUEL" value={vehicle.fuel} />
        <VehicleMiniSpec label="ENGINE" value={vehicle.engineSize} />
      </View>

      <View style={styles.bidRow}>
        <Text style={styles.bidRowText}>MILEAGE {mileageLabel}</Text>
        <Text style={styles.bidRowText}>{bidLabel}</Text>
      </View>

      <View style={styles.metaCard}>
        <VehicleMetaRow label="Auction date" value={auctionDateLabel} />
      </View>

      <View style={styles.verifyCard}>
        <VehicleVerifyRow text="Lorem ipsum dolor sit amet" />
        <VehicleVerifyRow text="consectetur adipiscing elit." />
        <VehicleVerifyRow text="Sed do eiusmod tempor incididunt" />
        <VehicleVerifyRow text="ut labore et dolore magna aliqua." />
      </View>
    </View>
  );
}

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

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    padding: 14,
    backgroundColor: BrandColors.surface,
    gap: 12,
  },

  miniSpecsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  miniSpecPill: {
    flex: 1,
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

  verifyCard: {
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
