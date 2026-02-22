import { useWindowDimensions } from 'react-native';

export const GRID_ITEM_HEIGHT = 490;
export const LOAD_MORE_THRESHOLD = 0.6;
const RESPONSIVE_BREAKPOINT = 768;

const calculateNumColumns = (width: number) => Math.max(2, Math.floor(width / GRID_ITEM_HEIGHT));

export const useGridDimensions = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= RESPONSIVE_BREAKPOINT;
  const NUMBER_COLUMNS = calculateNumColumns(width);
  return { NUMBER_COLUMNS, isLargeScreen };
};
