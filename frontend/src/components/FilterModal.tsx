import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { BrandColors } from '@/src/theme/BrandColors';
import { FILTER_YEARS, FILTER_PRICES } from '@/src/utils/const';
import { VEHICLE_MAKE_FILTER_OPTIONS } from '@shared/types';
import { useSearchStore } from '@/src/stores/searchStore';
import { useShallow } from 'zustand/shallow';
import type { TVehicleMakeFilter } from '@shared/types';

type TFilterModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const FilterModal = ({ visible, onClose }: TFilterModalProps) => {
  const [tempMake, setTempMake] = useState<TVehicleMakeFilter>('All');
  const [tempYear, setTempYear] = useState('');
  const [tempPriceRange, setTempPriceRange] = useState('');

  const {
    selectedMake,
    selectedYear,
    selectedPriceRange,
    setMakeFilter,
    setYearFilter,
    setPriceFilter,
  } = useSearchStore(
    useShallow((state) => ({
      selectedMake: state.selectedMake,
      selectedYear: state.selectedYear,
      selectedPriceRange: state.selectedPriceRange,
      setMakeFilter: state.setMakeFilter,
      setYearFilter: state.setYearFilter,
      setPriceFilter: state.setPriceFilter,
    })),
  );

  const { clearFiltersOnly } = useSearchStore.getState();

  useEffect(() => {
    if (visible) {
      setTempMake(selectedMake);
      setTempYear(selectedYear);
      setTempPriceRange(selectedPriceRange);
    }
  }, [visible, selectedMake, selectedYear, selectedPriceRange]);

  const handleApplyFilters = (): void => {
    setMakeFilter(tempMake);
    setYearFilter(tempYear);
    setPriceFilter(tempPriceRange);
    onClose();
  };

  const handleClearFilters = (): void => {
    clearFiltersOnly();
    setTempMake('All');
    setTempYear('');
    setTempPriceRange('');
    onClose();
  };

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
              {VEHICLE_MAKE_FILTER_OPTIONS.map((make) => (
                <TouchableOpacity
                  key={make}
                  style={[
                    styles.filterOptionChip,
                    tempMake === make && styles.filterOptionChipSelected,
                  ]}
                  onPress={() => setTempMake(make)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      tempMake === make && styles.filterOptionTextSelected,
                    ]}
                  >
                    {make}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Year</Text>
            <View style={styles.filterOptionsRow}>
              {FILTER_YEARS.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.filterOptionChip,
                    tempYear === year && styles.filterOptionChipSelected,
                  ]}
                  onPress={() => setTempYear(year)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      tempYear === year && styles.filterOptionTextSelected,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Price Range</Text>
            <View style={styles.filterOptionsRow}>
              {FILTER_PRICES.map((price) => (
                <TouchableOpacity
                  key={price}
                  style={[
                    styles.filterOptionChip,
                    tempPriceRange === price && styles.filterOptionChipSelected,
                  ]}
                  onPress={() => setTempPriceRange(price)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      tempPriceRange === price && styles.filterOptionTextSelected,
                    ]}
                  >
                    {price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
            <Text style={styles.clearButtonText}>Clear Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
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
    backgroundColor: BrandColors.backgroundElevated,
    borderWidth: 1,
    borderColor: BrandColors.border,
  },
  filterOptionChipSelected: {
    backgroundColor: BrandColors.textPrimary,
    borderColor: BrandColors.textPrimary,
  },
  filterOptionText: {
    color: BrandColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  filterOptionTextSelected: {
    color: BrandColors.background,
  },
  clearButton: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    color: BrandColors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  applyButton: {
    backgroundColor: BrandColors.textPrimary,
    marginHorizontal: 20,
    marginTop: 5,
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
