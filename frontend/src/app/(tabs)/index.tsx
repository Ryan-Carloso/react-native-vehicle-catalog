import { FlashList } from '@shopify/flash-list';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { ErrorComponent } from '@/src/components/ErrorComponent';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeEmptyState } from '@/src/components/EmptyState';
import type { TVehicle } from '@shared/types';
import { VehicleListItem } from '@/src/components/VehicleListItem';
import { GridNextPageSkeleton, GridSkeleton } from '@/src/components/HomeSkeleton';
import { AppRoutes } from '@/src/utils/const';
import { useVehiclesInfiniteQuery } from '@/src/utils/api/queries/useVehiclesInfiniteQuery';
import { BrandColors } from '@/src/theme/BrandColors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen() {
  const router = useRouter();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useVehiclesInfiniteQuery();

  const openVehicle = (vehicleId: string): void => {
    router.push({ pathname: AppRoutes.DETAIL_PATH, params: { id: vehicleId } });
  };

  if (isLoading) {
    return <GridSkeleton />;
  }

  if (isError) {
    return <ErrorComponent onRetry={refetch} />;
  }

  //---------------
  // List header composition
  // Keeps feed sections consistent
  //---------------
  const HomeFeedHeader = () => {
    return (
      <View style={styles.heroContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.logoRow}>
            <FontAwesome name="gear" size={24} color={BrandColors.accent} />
            <Text style={styles.heroTitle}>GEAR SHIFT</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={20} color={BrandColors.textMuted} />
            <TextInput
              placeholder="Search vehicles..."
              placeholderTextColor={BrandColors.textMuted}
              style={styles.searchInputField}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <FontAwesome name="filter" size={20} color={BrandColors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Vehicles</Text>
              <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
                <FontAwesome name="close" size={24} color={BrandColors.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {/* Dummy Filters */}
              <Text style={styles.filterSectionTitle}>Make</Text>
              <View style={styles.filterOptionsRow}>
                {['Toyota', 'BMW', 'Ford', 'Honda'].map((make) => (
                  <TouchableOpacity key={make} style={styles.filterOptionChip}>
                    <Text style={styles.filterOptionText}>{make}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterSectionTitle}>Year</Text>
              <View style={styles.filterOptionsRow}>
                {['2024', '2023', '2022', 'Old timers'].map((year) => (
                  <TouchableOpacity key={year} style={styles.filterOptionChip}>
                    <Text style={styles.filterOptionText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.filterOptionsRow}>
                {['$0 - $10k', '$10k - $30k', '$30k+'].map((price) => (
                  <TouchableOpacity key={price} style={styles.filterOptionChip}>
                    <Text style={styles.filterOptionText}>{price}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setIsFilterModalVisible(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.content}>
        <FlashList
          data={data?.vehicles ?? []}
          keyExtractor={(item: TVehicle): string => item.id}
          numColumns={2}
          estimatedItemSize={220}
          renderItem={({ item }: ListRenderItemInfo<TVehicle>) => (
            <VehicleListItem vehicle={item} variant="grid" onPress={() => openVehicle(item.id)} />
          )}
          ListHeaderComponent={HomeFeedHeader}
          ListEmptyComponent={HomeEmptyState}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              void fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.6}
          ListFooterComponent={<GridNextPageSkeleton isFetchingNextPage={isFetchingNextPage} />}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroTitle: {
    color: BrandColors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.surfaceMuted,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
  },
  searchInputField: {
    flex: 1,
    marginLeft: 10,
    color: BrandColors.textPrimary,
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: BrandColors.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: BrandColors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borderSoft,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BrandColors.textPrimary,
  },
  modalBody: {
    padding: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  filterOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  filterOptionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: BrandColors.surfaceMuted,
    borderWidth: 1,
    borderColor: BrandColors.borderSoft,
  },
  filterOptionText: {
    color: BrandColors.textPrimary,
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: BrandColors.accent,
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
