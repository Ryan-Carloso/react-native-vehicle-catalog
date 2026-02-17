import type { TVehicleMake } from '../backend/types';

export type { TFuelType, TVehicle, TVehicleMake } from '../backend/types';

export type TVehicleMakeFilter = TVehicleMake | 'All';

export const VEHICLE_MAKE_FILTER_OPTIONS: readonly TVehicleMakeFilter[] = [
  'All',
  'Audi',
  'BMW',
  'Citroen',
  'Ford',
  'Mercedes-Benz',
  'Toyota',
  'Volkswagen',
  'Volvo',
];
