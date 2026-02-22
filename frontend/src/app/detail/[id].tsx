import { useLocalSearchParams, useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';

import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorComponent } from '@/src/components/ErrorComponent';
import { VehicleDetailsItem } from '@/src/components/VehicleDetailsItem';
import { useVehicleDetailQuery } from '@/src/utils/api/queries/useVehicleDetailQuery';
import { BrandColors } from '@/src/theme/BrandColors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

type TVehicleRouteParams = {
  id?: string;
};

export default function VehicleDetailsScreen() {
  const router = useRouter();
  const { id }: TVehicleRouteParams = useLocalSearchParams<TVehicleRouteParams>();
  const vehicleId: string = typeof id === 'string' ? id : '';
  const { isLoading, isError, data, refetch } = useVehicleDetailQuery(vehicleId);

  if (!vehicleId) {
    return <ErrorComponent message="Invalid vehicle ID." />;
  }

  if (isLoading) {
    return <VehicleDetailsSkeleton />;
  }

  if (isError || !data) {
    return <ErrorComponent onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={BrandColors.textPrimary} />
          </Pressable>
          <Text style={styles.title}>
            {data.year} {data.make} {data.model}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.image }} style={styles.image} resizeMode="cover" />
          <Pressable style={[styles.favoriteBadge]}>
            <Ionicons
              name={data.favourite ? 'star' : 'star-outline'}
              size={24}
              color={data.favourite ? BrandColors.warning : BrandColors.textSecondary}
            />
          </Pressable>
        </View>
        <Pressable style={styles.bidButton}>
          <Text style={styles.bidButtonText}>PLACE BID</Text>
        </Pressable>
        <VehicleDetailsItem vehicle={data} />
      </ScrollView>
    </SafeAreaView>
  );
}

//---------------
// VehicleDetailsSkeleton
//---------------
const VehicleDetailsSkeleton = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style="light" />
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <Skeleton colorMode="light" width={30} height={30} radius={0} />
        </View>
        <View style={styles.skeletonTitleWrap}>
          <Skeleton colorMode="light" width="80%" height={30} radius={0} />
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Skeleton colorMode="light" width="100%" height={210} radius={0} />
      </View>

      <View style={styles.skeletonBidButton}>
        <Skeleton colorMode="light" width="100%" height={58} radius={0} />
      </View>

      <View style={styles.skeletonCard}>
        <View style={styles.skeletonMiniSpecsRow}>
          {Array.from({ length: 3 }).map((_, index: number) => (
            <View key={`mini-spec-${index}`} style={styles.skeletonMiniSpecPill}>
              <Skeleton colorMode="light" width="40%" height={12} radius={0} />
              <Skeleton colorMode="light" width="70%" height={16} radius={0} />
            </View>
          ))}
        </View>

        <View style={styles.skeletonBidRow}>
          <Skeleton colorMode="light" width="54%" height={25} radius={0} />
          <View style={styles.skeletonPriceWrap}>
            <Skeleton colorMode="light" width="60%" height={25} radius={0} />
          </View>
        </View>

        <View style={styles.skeletonMetaCard}>
          <View style={styles.skeletonRow}>
            <Skeleton colorMode="light" width="58%" height={17} radius={0} />
            <Skeleton colorMode="light" width="60%" height={17} radius={0} />
          </View>
        </View>

        <View style={styles.skeletonVerifyCard}>
          {Array.from({ length: 4 }).map((_, index: number) => (
            <View key={`verify-${index}`} style={styles.skeletonVerifyRow}>
              <View style={styles.verifyDot}>
                <Skeleton colorMode="light" width={16} height={16} radius={0} />
              </View>
              <View style={styles.skeletonVerifyTextWrap}>
                <Skeleton
                  colorMode="light"
                  width={index === 2 ? '64%' : index === 3 ? '78%' : '72%'}
                  height={17}
                  radius={0}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.background,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 210,
    backgroundColor: BrandColors.surfaceMuted,
  },
  favoriteBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 4,
    maxWidth: '90%',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    color: BrandColors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    margin: 'auto',
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidButton: {
    padding: 12,
    marginTop: 10,
    backgroundColor: BrandColors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidButtonText: {
    color: BrandColors.background,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  skeletonCard: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    padding: 14,
    backgroundColor: BrandColors.surface,
    gap: 12,
  },
  skeletonTitleWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonBidButton: {
    marginTop: 10,
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonMiniSpecsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  skeletonMiniSpecPill: {
    flex: 1,
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surfaceStrong,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 4,
  },
  skeletonMetaCard: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    padding: 10,
    backgroundColor: BrandColors.surfaceStrong,
    gap: 8,
  },
  skeletonVerifyCard: {
    borderWidth: 1,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surfaceStrong,
    padding: 12,
    gap: 10,
  },
  skeletonVerifyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skeletonBidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonPriceWrap: {
    flex: 1,
    alignItems: 'flex-end',
  },
  verifyDot: {
    width: 16,
    height: 16,
    backgroundColor: BrandColors.success,
  },
  skeletonVerifyTextWrap: {
    flex: 1,
  },
});
