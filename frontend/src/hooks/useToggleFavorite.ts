import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '../utils/const';
import { VEHICLE_DETAIL_QUERY_KEY } from '../utils/api/queries/useVehicleDetailQuery';

type Vehicle = {
  id: string;
  favourite: boolean;
};

async function toggleFavorite({
  vehicleId,
  currentFavorite,
}: {
  vehicleId: string;
  currentFavorite: boolean;
}) {
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favourite: !currentFavorite }),
  });

  if (!response.ok) {
    throw new Error('Failed to update favorite');
  }

  return response.json();
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavorite,

    onMutate: async ({ vehicleId, currentFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ['vehicles'] });

      const previousVehicles = queryClient.getQueryData<Vehicle[]>(['vehicles']);

      queryClient.setQueryData<Vehicle[]>(['vehicles'], (old) =>
        old?.map((v) => (v.id === vehicleId ? { ...v, favourite: !currentFavorite } : v)),
      );

      return { previousVehicles };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousVehicles) {
        queryClient.setQueryData(['vehicles'], context.previousVehicles);
      }

      alert('Failed to update favorite');
    },

    onSettled: (_data, _error, { vehicleId }) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: VEHICLE_DETAIL_QUERY_KEY(vehicleId) });
    },
  });
}
