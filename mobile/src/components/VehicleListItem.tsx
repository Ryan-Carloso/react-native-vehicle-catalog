import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { TVehicle } from '@shared/types';
import { BrandColors } from '@/src/theme/BrandColors';

type TVehicleListItemVariant = 'default' | 'featured' | 'grid';

type TVehicleListItemProps = {
  vehicle: TVehicle;
  onPress: () => void;
  variant?: TVehicleListItemVariant;
};

export function VehicleListItem({ vehicle, onPress, variant = 'default' }: TVehicleListItemProps) {
  const bidLabel: string = formatCurrency(vehicle.startingBid);
  const watchLabel: string = vehicle.favourite ? 'Watched' : 'Live';
  const mileageLabel: string = formatMileage(vehicle.mileage);

  //---------------
  // Dense card for two-column feed grid
  // Mirrors Figma compact auction cards
  //---------------
  if (variant === 'grid') {
    return (
      <Pressable onPress={onPress} style={styles.gridCard}>
        <Image source={{ uri: vehicle.image }} style={styles.gridImage} resizeMode="cover" />

        <Text style={styles.gridTitle} numberOfLines={1}>
          {vehicle.make} {vehicle.model}
        </Text>

        <Text style={styles.gridMeta} numberOfLines={1}>
          {vehicle.year} - {vehicle.fuel}
        </Text>

        <Text style={styles.gridPrice}>{bidLabel}</Text>
      </Pressable>
    );
  }

  //---------------
  // Main featured card with strong hierarchy
  // Used at top of Home feed
  //---------------
  if (variant === 'featured') {
    return (
      <Pressable onPress={onPress} style={styles.featuredCard}>
        <Image source={{ uri: vehicle.image }} style={styles.featuredImage} resizeMode="cover" />

        <View style={styles.featuredMetaRow}>
          <Text style={styles.featuredFlash}>FLASH AUCTION</Text>
          <Text style={styles.featuredTime}>{formatAuctionCountdown(vehicle.auctionDateTime)}</Text>
        </View>

        <View style={styles.featuredInfoRow}>
          <Text style={styles.featuredBidLabel}>Current bid</Text>
          <Text style={styles.featuredBidValue}>{bidLabel}</Text>
        </View>

        <View style={styles.featuredInfoRow}>
          <Text style={styles.featuredName} numberOfLines={1}>
            {vehicle.make} {vehicle.model}
          </Text>
          <Text style={styles.featuredBids}>{mileageLabel}</Text>
        </View>
      </Pressable>
    );
  }

  //---------------
  // Default full card used in list contexts
  // Preserves existing behavior and layout
  //---------------
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: vehicle.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>
          {vehicle.make} {vehicle.model}
        </Text>

        <Text style={styles.meta}>
          {vehicle.year} - {vehicle.engineSize} - {vehicle.fuel}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.watchBadge}>
            <View style={styles.dot} />
            <Text style={styles.watchBadgeText}>{watchLabel}</Text>
          </View>
          <Text style={styles.metaSmall}>{mileageLabel}</Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Starting bid</Text>
          </View>
          <Text style={styles.price}>{bidLabel}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMileage(value: number): string {
  return `${new Intl.NumberFormat('en-US').format(value)} km`;
}

function formatAuctionCountdown(auctionDateTime: string): string {
  const nowMs: number = Date.now();
  const auctionMs: number = new Date(auctionDateTime).getTime();

  if (Number.isNaN(auctionMs) || auctionMs <= nowMs) {
    return 'LIVE NOW';
  }

  const diffMinutes: number = Math.floor((auctionMs - nowMs) / 60_000);
  const hours: number = Math.floor(diffMinutes / 60);
  const minutes: number = diffMinutes % 60;

  return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    backgroundColor: BrandColors.surfaceStrong,
    shadowColor: BrandColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: BrandColors.surfaceMuted,
  },
  content: {
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.textPrimary,
  },
  meta: {
    marginTop: 8,
    fontSize: 14,
    color: BrandColors.textSecondary,
  },
  infoRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  watchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: BrandColors.backgroundElevated,
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: BrandColors.accentGlow,
  },
  watchBadgeText: {
    color: BrandColors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  metaSmall: {
    color: BrandColors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  footerRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: BrandColors.backgroundElevated,
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
  },
  badgeText: {
    color: BrandColors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  price: {
    color: BrandColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  featuredCard: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: '#10172b',
  },
  featuredImage: {
    width: '100%',
    height: 228,
    borderRadius: 16,
    backgroundColor: BrandColors.surfaceMuted,
  },
  featuredMetaRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredFlash: {
    color: BrandColors.accentGlow,
    fontSize: 16,
    fontWeight: '800',
  },
  featuredTime: {
    color: BrandColors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  featuredInfoRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredBidLabel: {
    color: BrandColors.textMuted,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  featuredBidValue: {
    color: BrandColors.textPrimary,
    fontSize: 32,
    fontWeight: '900',
  },
  featuredName: {
    color: BrandColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    maxWidth: '68%',
  },
  featuredBids: {
    color: BrandColors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },

  gridCard: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surfaceStrong,
  },
  gridImage: {
    width: '100%',
    height: 94,
    borderRadius: 10,
    backgroundColor: BrandColors.surfaceMuted,
  },
  gridTitle: {
    marginTop: 8,
    color: BrandColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  gridMeta: {
    marginTop: 2,
    color: BrandColors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  gridPrice: {
    marginTop: 8,
    color: BrandColors.accentGlow,
    fontSize: 15,
    fontWeight: '800',
  },
});
