export type FuelType = 'diesel' | 'petrol';

export type VehicleMake =
  | 'Audi'
  | 'BMW'
  | 'Citroen'
  | 'Ford'
  | 'Mercedes-Benz'
  | 'Toyota'
  | 'Volkswagen'
  | 'Volvo';

export type Vehicle = {
  id: string;
  make: VehicleMake;
  model: string;
  engineSize: string;
  fuel: FuelType;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
};

export type Database = {
  vehicles: Vehicle[];
};
