import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '@/src/utils/const';
import { VEHICLE_DETAIL_QUERY_KEY } from '@/src/utils/api/queries/useVehicleDetailQuery';

type TPlaceBidVariables = {
  vehicleId: string;
  bidAmount: number;
  currentHasBid: boolean;
};

async function placeBid({ vehicleId, bidAmount, currentHasBid }: TPlaceBidVariables) {
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentBid: bidAmount, hasBid: true }),
  });

  if (!response.ok) {
    throw new Error('Failed to place bid');
  }

  return response.json();
}

export function usePlaceBid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeBid,

    onMutate: async ({ vehicleId, bidAmount, currentHasBid }) => {
      await queryClient.cancelQueries({ queryKey: ['vehicles'] });
      await queryClient.cancelQueries({ queryKey: VEHICLE_DETAIL_QUERY_KEY(vehicleId) });

      const previousVehicles = queryClient.getQueryData<unknown[]>(['vehicles']);
      const previousVehicle = queryClient.getQueryData(VEHICLE_DETAIL_QUERY_KEY(vehicleId));

      queryClient.setQueryData<unknown[]>(['vehicles'], (old) => {
        if (!old) return old;
        return old.map((v: unknown) => {
          if (typeof v === 'object' && v !== null && 'id' in v && v.id === vehicleId) {
            return { ...v, currentBid: bidAmount, hasBid: true };
          }
          return v;
        });
      });

      queryClient.setQueryData(VEHICLE_DETAIL_QUERY_KEY(vehicleId), (old: unknown) => {
        if (!old || typeof old !== 'object' || old === null) return old;
        return { ...old, currentBid: bidAmount, hasBid: true };
      });

      return { previousVehicles, previousVehicle };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousVehicles) {
        queryClient.setQueryData(['vehicles'], context.previousVehicles);
      }
      if (context?.previousVehicle) {
        queryClient.setQueryData(
          VEHICLE_DETAIL_QUERY_KEY(_variables.vehicleId),
          context.previousVehicle,
        );
      }

      alert('Failed to place bid');
    },

    onSettled: (_data, _error, { vehicleId }) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: VEHICLE_DETAIL_QUERY_KEY(vehicleId) });
    },
  });
}
