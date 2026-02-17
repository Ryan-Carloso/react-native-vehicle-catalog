import { Image, StyleSheet } from 'react-native';

import { BrandColors } from '@/src/theme/BrandColors';

type TVehicleHeroImageProps = {
  imageUrl: string;
};

export function VehicleHeroImage({ imageUrl }: TVehicleHeroImageProps) {
  return <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 210,
    borderRadius: 14,
    backgroundColor: BrandColors.surfaceMuted,
    borderWidth: 1,
    borderColor: BrandColors.border,
  },
});
