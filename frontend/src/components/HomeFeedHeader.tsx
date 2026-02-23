import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BrandColors } from '@/src/theme/BrandColors';
import { useSearchStore } from '@/src/stores/searchStore';
import { useShallow } from 'zustand/shallow';
import { useRef, useState, useEffect, useMemo } from 'react';
import { isSearchEnabled } from '@/src/utils/api/queries/useVehiclesSearchQuery';

type TSearchHeaderProps = {
  onFilterPress: () => void;
};

export const HomeFeedHeader = ({ onFilterPress }: TSearchHeaderProps) => {
  const [localSearchInput, setLocalSearchInput] = useState('');
  const textInputRef = useRef<TextInput>(null);

  const { searchQuery } = useSearchStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
    })),
  );

  const { setSearchQuery, clearAllFilters, clearFiltersOnly } = useSearchStore.getState();

  const currentSearchEnabled = useMemo(
    () => isSearchEnabled({ searchQuery: localSearchInput }),
    [localSearchInput],
  );

  const showClearButton = !!(localSearchInput || currentSearchEnabled);

  useEffect(() => {
    setLocalSearchInput(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (): void => {
    const query = localSearchInput.toLowerCase();
    if (query) {
      clearFiltersOnly();
    }
    setSearchQuery(query);
  };

  const handleClearAll = (): void => {
    setLocalSearchInput('');
    setSearchQuery('');
    clearAllFilters();
    textInputRef.current?.focus();
  };

  const handleSearchIconPress = (): void => {
    setSearchQuery(localSearchInput.toLowerCase());
  };

  return (
    <View style={styles.heroContainer}>
      <View style={styles.headerTopRow}>
        <View style={styles.logoRow}>
          <FontAwesome name="gear" size={24} color={BrandColors.textPrimary} />
          <Text style={styles.heroTitle}>GEAR SHIFT</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchIconWrapper}
          onPress={handleSearchIconPress}
          hitSlop={4}
        >
          <FontAwesome name="search" size={20} color={BrandColors.textMuted} />
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          value={localSearchInput}
          onChangeText={setLocalSearchInput}
          placeholder="Search vehicles..."
          placeholderTextColor={BrandColors.textMuted}
          style={styles.searchInputField}
          onSubmitEditing={handleSearchSubmit}
          onEndEditing={handleSearchSubmit}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {showClearButton && (
          <TouchableOpacity onPress={handleClearAll} hitSlop={4} style={styles.clearButton}>
            <FontAwesome name="times" size={16} color={BrandColors.textMuted} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <FontAwesome name="filter" size={20} color={BrandColors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(8,10,12,0.88)',
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },
  searchIconWrapper: {
    padding: 2,
  },
  searchInputField: {
    flex: 1,
    color: BrandColors.textPrimary,
    fontSize: 16,
    fontFamily: 'Courier',
    fontWeight: '700',
  },
  clearButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
});
