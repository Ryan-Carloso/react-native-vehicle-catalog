import { Image, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BrandColors } from '@/src/theme/BrandColors';

type TAppScreenHeaderProps = {
  onBackPress: () => void;
};

export function AppScreenHeader({ onBackPress }: TAppScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <View style={styles.logoContainer}>
        <Image source={require('@/assets/icon.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: BrandColors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginTop: -2,
  },
  logo: {
    width: 60,
    height: 60,
  },
  spacer: {
    width: 42,
    height: 42,
  },
});
