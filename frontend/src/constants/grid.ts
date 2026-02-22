export const GRID_ITEM_HEIGHT = 490;
export const LOAD_MORE_THRESHOLD = 0.6;
export const calculateNumColumns = (width: number) =>
  Math.max(2, Math.floor(width / GRID_ITEM_HEIGHT));
