import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BrandColors } from '@/src/theme/BrandColors';
import { FILTER_MAKES, FILTER_YEARS, FILTER_PRICES } from '@/src/utils/const';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const FilterModal = ({ visible, onClose }: FilterModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Vehicles</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="close" size={24} color={BrandColors.textPrimary} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody}>
            <Text style={styles.filterSectionTitle}>Make</Text>
            <View style={styles.filterOptionsRow}>
              {FILTER_MAKES.map((make) => (
                <TouchableOpacity key={make} style={styles.filterOptionChip}>
                  <Text style={styles.filterOptionText}>{make}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Year</Text>
            <View style={styles.filterOptionsRow}>
              {FILTER_YEARS.map((year) => (
                <TouchableOpacity key={year} style={styles.filterOptionChip}>
                  <Text style={styles.filterOptionText}>{year}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Price Range</Text>
            <View style={styles.filterOptionsRow}>
              {FILTER_PRICES.map((price) => (
                <TouchableOpacity key={price} style={styles.filterOptionChip}>
                  <Text style={styles.filterOptionText}>{price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.applyButton} onPress={onClose}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: BrandColors.surface,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: BrandColors.textPrimary,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  modalBody: {
    padding: 20,
  },
  filterSectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: BrandColors.textPrimary,
    marginBottom: 12,
    marginTop: 10,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  filterOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  filterOptionChip: {
    minWidth: 108,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: BrandColors.background,
  },
  filterOptionText: {
    color: BrandColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  applyButton: {
    backgroundColor: BrandColors.textPrimary,
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: BrandColors.background,
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
});
