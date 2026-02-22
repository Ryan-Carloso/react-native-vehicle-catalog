import { StyleSheet, Text, View } from 'react-native';
import { BrandColors } from '@/src/theme/BrandColors';

export const EmptyState = () => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyStateTitle}>No vehicles found</Text>
    <Text style={styles.emptyStateText}>Try another make filter.</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyState: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyStateTitle: {
    color: BrandColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyStateText: {
    marginTop: 6,
    color: BrandColors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
});
