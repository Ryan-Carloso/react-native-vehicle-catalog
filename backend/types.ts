export type TFuelType = 'diesel' | 'petrol';

export type TVehicleMake =
  | 'Audi'
  | 'BMW'
  | 'Citroen'
  | 'Ford'
  | 'Mercedes-Benz'
  | 'Toyota'
  | 'Volkswagen'
  | 'Volvo';

export type TVehicle = {
  id: string;
  make: TVehicleMake;
  model: string;
  image: string;
  engineSize: string;
  fuel: TFuelType;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
};
