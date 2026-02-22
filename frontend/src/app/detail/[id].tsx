import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Skeleton } from 'moti/skeleton';

import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import type { TVehicle } from '@shared/types';

import { ErrorComponent } from '@/src/components/ErrorComponent';
import { VehicleDetailsItem } from '@/src/components/VehicleDetailsItem';
import { useGridDimensions } from '@/src/constants/grid';
import { BrandColors } from '@/src/theme/BrandColors';
import { useVehicleDetailQuery } from '@/src/utils/api/queries/useVehicleDetailQuery';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

type TVehicleRouteParams = {
  id?: string;
};

export default function VehicleDetailsScreen() {
  const { id }: TVehicleRouteParams = useLocalSearchParams<TVehicleRouteParams>();
  const vehicleId: string = typeof id === 'string' ? id : '';
  const { isLoading, isError, data, refetch } = useVehicleDetailQuery(vehicleId);
  const { isLargeScreen } = useGridDimensions();

  if (!vehicleId) {
    return <ErrorComponent message="Invalid vehicle ID." />;
  }

  if (isLoading) {
    return <VehicleDetailsSkeleton />;
  }

  if (isError || !data) {
    return <ErrorComponent onRetry={refetch} />;
  }

  const mainContainerStyle = [styles.mainContainer, isLargeScreen && styles.mainContainerLarge];
  const imageSectionStyle = [styles.imageSection, isLargeScreen && styles.imageSectionLarge];
  const detailsSectionStyle = [styles.detailsSection, isLargeScreen && styles.detailsSectionLarge];
  const contentContainerStyle = [styles.content, isLargeScreen && styles.contentLarge];

  return (
    <LinearGradient
      colors={[BrandColors.background, BrandColors.heroEnd]}
      locations={[0, 1]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <VehicleDetailsHeader data={data} />
      <ScrollView contentContainerStyle={contentContainerStyle}>
        <View style={mainContainerStyle}>
          <View style={imageSectionStyle}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: data.image }} style={styles.image} resizeMode="cover" />
              <Pressable style={styles.favoriteBadge}>
                <Ionicons
                  name={data.favourite ? 'star' : 'star-outline'}
                  size={24}
                  color={data.favourite ? BrandColors.warning : BrandColors.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          <View style={detailsSectionStyle}>
            <View style={styles.detailsPanel}>
              <Pressable style={styles.bidButton}>
                <Text style={styles.bidButtonText}>PLACE BID</Text>
              </Pressable>
              <VehicleDetailsItem vehicle={data} />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const VehicleDetailsHeader = ({ data }: { data: TVehicle }) => {
  const router = useRouter();
  const { isLargeScreen } = useGridDimensions();
  const insets = useSafeAreaInsets();

  const headerWrapStyle = [styles.headerWrap, isLargeScreen && styles.headerWrapLarge];
  const headerStyle = [styles.header, isLargeScreen && styles.headerLarge];
  const titleStyle = [styles.title, isLargeScreen && styles.titleLarge];
  const backButtonStyle = [styles.backButton, isLargeScreen && styles.backButtonLarge];
  const headerSpacerStyle = [styles.headerSpacer, isLargeScreen && styles.headerSpacerLarge];
  const topInsetStyle = [{ paddingTop: insets.top }];

  return (
    <View style={styles.headerSafeArea}>
      <View style={topInsetStyle}>
        <View style={headerWrapStyle}>
          <View style={headerStyle}>
            <Pressable onPress={() => router.back()} style={backButtonStyle}>
              <Ionicons name="arrow-back" size={24} color={BrandColors.textPrimary} />
            </Pressable>
            <View style={styles.headerTitleWrap}>
              <Text style={styles.subtitle}>AUCTION DETAIL</Text>
              <Text style={titleStyle} numberOfLines={1}>
                {data.year} {data.make} {data.model}
              </Text>
            </View>
            <View style={headerSpacerStyle} />
          </View>
        </View>
      </View>
    </View>
  );
};

//---------------
// VehicleDetailsSkeleton
//---------------
const VehicleDetailsSkeleton = () => {
  const { isLargeScreen } = useGridDimensions();

  const mainContainerStyle = [styles.mainContainer, isLargeScreen && styles.mainContainerLarge];
  const imageSectionStyle = [styles.imageSection, isLargeScreen && styles.imageSectionLarge];
  const detailsSectionStyle = [styles.detailsSection, isLargeScreen && styles.detailsSectionLarge];
  const contentContainerStyle = [styles.content, isLargeScreen && styles.contentLarge];
  const headerWrapStyle = [styles.headerWrap, isLargeScreen && styles.headerWrapLarge];
  const headerStyle = [styles.header, isLargeScreen && styles.headerLarge];
  const backButtonStyle = [styles.backButton, isLargeScreen && styles.backButtonLarge];
  const headerSpacerStyle = [styles.headerSpacer, isLargeScreen && styles.headerSpacerLarge];

  return (
    <LinearGradient
      colors={[BrandColors.background, BrandColors.heroEnd]}
      locations={[0, 1]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={headerWrapStyle}>
          <View style={headerStyle}>
            <View style={backButtonStyle}>
              <Skeleton colorMode="light" width={28} height={20} radius={0} />
            </View>
            <View style={styles.skeletonTitleWrap}>
              <Skeleton colorMode="light" width="34%" height={14} radius={0} />
              <Skeleton colorMode="light" width="62%" height={22} radius={0} />
            </View>
            <View style={headerSpacerStyle} />
          </View>
        </View>
      </SafeAreaView>
      <ScrollView contentContainerStyle={contentContainerStyle}>
        <View style={mainContainerStyle}>
          <View style={imageSectionStyle}>
            <View style={styles.imageContainer}>
              <Skeleton colorMode="light" width="100%" height="100%" radius={0} />
            </View>
          </View>

          <View style={detailsSectionStyle}>
            <View style={styles.detailsPanel}>
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
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  content: {
    padding: 16,
    flexGrow: 1,
    alignItems: 'center',
  },
  contentLarge: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  mainContainer: {
    width: '100%',
    maxWidth: 1220,
    gap: 18,
  },
  mainContainerLarge: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 28,
  },
  imageSection: {
    width: '100%',
  },
  imageSectionLarge: {
    flex: 1.3,
  },
  detailsSection: {
    width: '100%',
    gap: 16,
  },
  detailsSectionLarge: {
    flex: 1,
    maxWidth: 480,
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: BrandColors.surfaceMuted,
    borderWidth: 3,
    borderColor: BrandColors.borderSoft,
    shadowColor: BrandColors.shadow,
    shadowOffset: { width: 10, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 22,
    elevation: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderWidth: 2,
    borderColor: BrandColors.borderSoft,
    backgroundColor: BrandColors.overlayVignette,
  },
  headerSafeArea: {
    backgroundColor: BrandColors.backgroundElevated,
    zIndex: 1,
  },
  headerWrap: {
    alignItems: 'center',
    backgroundColor: BrandColors.backgroundElevated,
    borderBottomWidth: 3,
    borderBottomColor: BrandColors.textPrimary,
  },
  headerWrapLarge: {
    borderBottomWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1220,
    backgroundColor: BrandColors.backgroundElevated,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  headerLarge: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    borderWidth: 2,
    borderColor: BrandColors.textPrimary,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.background,
    shadowColor: BrandColors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  backButtonLarge: {
    width: 48,
    height: 48,
  },
  headerTitleWrap: {
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 42,
    height: 42,
  },
  headerSpacerLarge: {
    width: 48,
    height: 48,
  },
  subtitle: {
    color: BrandColors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: BrandColors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  titleLarge: {
    fontSize: 22,
    letterSpacing: 1.2,
  },
  detailsPanel: {
    borderWidth: 3,
    borderColor: BrandColors.borderSoft,
    backgroundColor: BrandColors.cardDepth,
    padding: 10,
    shadowColor: BrandColors.shadow,
    shadowOffset: { width: 8, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 14,
    gap: 10,
  },
  bidButton: {
    minHeight: 58,
    borderWidth: 2,
    borderColor: BrandColors.textPrimary,
    backgroundColor: BrandColors.warning,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BrandColors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
  },
  bidButtonText: {
    color: BrandColors.background,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
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
    gap: 6,
  },
  skeletonBidButton: {
    marginBottom: 6,
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
