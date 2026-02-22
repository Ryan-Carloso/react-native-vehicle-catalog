import { useQuery } from '@tanstack/react-query';

import type { TVehicle } from '@shared/types';
import { API_BASE_URL } from '@/src/utils/const';
import { delay } from '@/src/utils/api/mockup-delay';

const VEHICLE_DETAIL_QUERY_KEY = (
  vehicleId: string,
): readonly ['vehicle', 'detail', { id: string }] => ['vehicle', 'detail', { id: vehicleId }];

async function fetchVehicleDetailById(vehicleId: string): Promise<TVehicle> {
  if (!API_BASE_URL) {
    throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');
  }

  const response: Response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`);

  if (!response.ok) {
    throw new Error(`Vehicle detail request failed with status ${response.status}`);
  }

  const payload: TVehicle = await response.json();

  await delay();

  return payload;
}

export function useVehicleDetailQuery(vehicleId: string) {
  return useQuery({
    queryKey: VEHICLE_DETAIL_QUERY_KEY(vehicleId),
    queryFn: () => fetchVehicleDetailById(vehicleId),
    enabled: vehicleId.length > 0,
    staleTime: 60_000,
  });
}
