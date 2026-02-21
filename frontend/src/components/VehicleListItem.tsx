import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import type { TVehicle } from '@shared/types';
import { BrandColors } from '@/src/theme/BrandColors';
import { formatCurrency } from '@/src/utils/formatters';

type TVehicleListItemProps = {
  vehicle: TVehicle;
  onPress: () => void;
};

export function VehicleListItem({ vehicle, onPress }: TVehicleListItemProps) {
  const bidLabel: string = formatCurrency(vehicle.startingBid);
  const favoriteIconName: 'star' | 'star-outline' = vehicle.favourite ? 'star' : 'star-outline';

  //---------------
  // Default full card used in list contexts
  // Preserves existing behavior and layout
  //---------------
  return (
    <Pressable onPress={onPress} style={styles.gridCard}>
      <LinearGradient
        colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.02)', 'rgba(0,0,0,0.26)']}
        locations={[0, 0.15, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={styles.gridImageFrame}>
        <Image source={{ uri: vehicle.image }} style={styles.gridImage} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)']}
          locations={[0.6, 1]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </View>

      <Text style={styles.gridTitle} numberOfLines={1}>
        {vehicle.make} {vehicle.model}
      </Text>

      <Text style={styles.gridMeta} numberOfLines={1}>
        {vehicle.year} - {vehicle.fuel}
      </Text>

      <View
        style={[
          styles.gridFavoriteBadge,
          vehicle.favourite ? styles.gridFavoriteBadgeActive : styles.gridFavoriteBadgeInactive,
        ]}
      >
        <Ionicons
          name={favoriteIconName}
          size={12}
          style={styles.gridFavoriteIcon}
          color={vehicle.favourite ? BrandColors.warning : BrandColors.textSecondary}
        />
      </View>

      <Text style={styles.gridPrice}>{bidLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gridCard: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: BrandColors.backgroundElevated,
    overflow: 'hidden',
    shadowColor: BrandColors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  gridImageFrame: {
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: 94,
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
  gridFavoriteBadge: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    alignSelf: 'flex-start',
  },
  gridFavoriteBadgeActive: {
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
    backgroundColor: BrandColors.backgroundElevated,
  },
  gridFavoriteBadgeInactive: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surfaceMuted,
  },
  gridFavoriteIcon: {
    marginTop: -1,
  },
});
