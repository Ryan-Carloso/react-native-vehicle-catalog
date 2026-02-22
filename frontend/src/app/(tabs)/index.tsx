import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FilterModal } from '@/src/components/FilterModal';
import { ErrorComponent } from '@/src/components/ErrorComponent';
import { VehicleList } from '@/src/components/VehicleList';
import { GridSkeleton } from '@/src/components/GridSkeleton';
import { AppRoutes } from '@/src/utils/const';
import { useVehiclesInfiniteQuery } from '@/src/utils/api/queries/useVehiclesInfiniteQuery';
import { BrandColors } from '@/src/theme/BrandColors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const router = useRouter();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useVehiclesInfiniteQuery();

  const openVehicle = (vehicleId: string): void => {
    router.push({ pathname: AppRoutes.DETAIL_PATH, params: { id: vehicleId } });
  };

  if (isLoading) {
    return <GridSkeleton isHomePage />;
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
        <StatusBar style="light" />
        <View style={styles.headerTopRow}>
          <View style={styles.logoRow}>
            <FontAwesome name="gear" size={24} color={BrandColors.textPrimary} />
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
    <LinearGradient
      colors={['#232326', '#141416', '#0a0a0b']}
      locations={[0, 0.45, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <FilterModal
          visible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible(false)}
        />
        <View style={styles.content}>
          <VehicleList
            data={data?.vehicles ?? []}
            onVehiclePress={openVehicle}
            ListHeaderComponent={HomeFeedHeader}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                void fetchNextPage();
              }
            }}
            isFetchingNextPage={isFetchingNextPage}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 10,
    gap: 14,
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.background,
    shadowColor: BrandColors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heroTitle: {
    color: BrandColors.textPrimary,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(8,10,12,0.88)',
    paddingHorizontal: 12,
    height: 48,
  },
  searchInputField: {
    flex: 1,
    marginLeft: 10,
    color: BrandColors.textPrimary,
    fontSize: 16,
    fontFamily: 'Courier',
    fontWeight: '700',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(8,10,12,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
});
