import { ContentStyle, FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import { EmptyState } from '@/src/components/EmptyState';
import { BrandColors } from '@/src/theme/BrandColors';
import { formatCurrency } from '@/src/utils/formatters';
import type { TVehicle } from '@shared/types';
import { SingleGridCardSkeleton } from './skeletons/SingleGridCardSkeleton';
import { nanoid } from 'nanoid/non-secure';

import { GRID_ITEM_HEIGHT, calculateNumColumns, LOAD_MORE_THRESHOLD } from '../constants/grid';

type TVehicleListProps = {
  data: TVehicle[];
  onEndReached: () => void;
  isFetchingNextPage: boolean;
  ListHeaderComponent?: React.ComponentType<Record<string, never>> | React.ReactElement | null;
  onVehiclePress: (id: string) => void;
  contentContainerStyle?: ContentStyle;
};

type TVehicleListItemProps = {
  vehicle: TVehicle;
  onPress: () => void;
};

export function VehicleList({
  data,
  onEndReached,
  isFetchingNextPage,
  ListHeaderComponent,
  onVehiclePress,
  contentContainerStyle,
}: TVehicleListProps) {
  const { width } = useWindowDimensions();
  const numColumns = calculateNumColumns(width);
  const cardWidth = width / numColumns;

  return (
    <FlashList
      data={data}
      keyExtractor={(item: TVehicle) => item.id}
      numColumns={numColumns}
      key={numColumns}
      estimatedItemSize={GRID_ITEM_HEIGHT}
      renderItem={({ item }: ListRenderItemInfo<TVehicle>) => (
        <VehicleListItem vehicle={item} onPress={() => onVehiclePress(item.id)} />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={EmptyState}
      onEndReached={onEndReached}
      onEndReachedThreshold={LOAD_MORE_THRESHOLD}
      ListFooterComponent={isFetchingNextPage ? <GridNextPageSkeleton /> : null}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

//---------------
// Local component for vehicle list item
//---------------
const VehicleListItem = ({ vehicle, onPress }: TVehicleListItemProps) => {
  const bidLabel: string = formatCurrency(vehicle.startingBid);
  const favoriteIconName: 'star' | 'star-outline' = vehicle.favourite ? 'star' : 'star-outline';

  return (
    <Pressable onPress={onPress} style={styles.gridCard}>
      <LinearGradient
        colors={BrandColors.cardGradient}
        locations={BrandColors.cardGradientLocations}
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
        <View style={[styles.gridFavoriteBadge]}>
          <Ionicons
            name={favoriteIconName}
            size={18}
            style={styles.gridFavoriteIcon}
            color={vehicle.favourite ? BrandColors.accent : BrandColors.textSecondary}
          />
        </View>
      </View>

      <Text style={styles.gridTitle} numberOfLines={1}>
        {vehicle.make} {vehicle.model}
      </Text>

      <Text style={styles.gridMeta} numberOfLines={1}>
        {vehicle.year} - {vehicle.fuel}
      </Text>

      <Text style={styles.gridPrice}>{bidLabel}</Text>
    </Pressable>
  );
};

const GridNextPageSkeleton = () => {
  const rowKeys = Array.from({ length: 3 }, () => nanoid());

  return (
    <View style={styles.nextPageLoading}>
      {rowKeys.map((rowKey) => (
        <View key={rowKey} style={styles.gridRow}>
          <SingleGridCardSkeleton />
          <SingleGridCardSkeleton />
        </View>
      ))}
    </View>
  );
};

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
  nextPageLoading: {
    paddingVertical: 14,
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridImageFrame: {
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    aspectRatio: 1.5,
  },
  gridTitle: {
    marginTop: 8,
    color: BrandColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  gridMeta: {
    marginTop: 2,
    color: BrandColors.textMuted,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  gridPrice: {
    marginTop: 8,
    color: BrandColors.accentGlow,
    fontSize: 18,
    fontWeight: '800',
  },
  gridFavoriteBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridFavoriteIcon: {
    marginTop: -1,
  },
});
