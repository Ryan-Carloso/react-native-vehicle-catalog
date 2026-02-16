import type { VehicleMake } from '../backend/types';

export type { Database, FuelType, Vehicle, VehicleMake } from '../backend/types';

export type VehicleMakeFilter = VehicleMake | 'All';

export const VEHICLE_MAKE_FILTER_OPTIONS: readonly VehicleMakeFilter[] = [
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
