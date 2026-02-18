import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BrandColors } from '@/src/theme/BrandColors';

export const ErrorComponent = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.center}>
      <Text style={styles.errorText}>An error occurred. Please try again.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: BrandColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
