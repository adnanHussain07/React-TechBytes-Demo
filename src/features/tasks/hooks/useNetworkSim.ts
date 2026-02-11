import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNetworkSettings, updateNetworkSettings } from '../api';
import { NetworkSimulatorSettings } from '../types';

export const useNetworkSim = () => {
  const queryClient = useQueryClient();

  const {
    data: settings,
    isLoading,
    isError,
    error,
  } = useQuery<NetworkSimulatorSettings, Error>({
    queryKey: ['networkSettings'],
    queryFn: getNetworkSettings,
  });

  const updateSettingsMutation = useMutation<
    NetworkSimulatorSettings,
    Error,
    NetworkSimulatorSettings,
    { previousSettings: NetworkSimulatorSettings | undefined } // Add context type here
  >({
    mutationFn: updateNetworkSettings,
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: ['networkSettings'] });
      const previousSettings = queryClient.getQueryData<NetworkSimulatorSettings>([
        'networkSettings',
      ]);
      queryClient.setQueryData<NetworkSimulatorSettings>(['networkSettings'], newSettings);
      return { previousSettings };
    },
    onError: (_err, _newSettings, context) => { // Rename unused params
      queryClient.setQueryData(['networkSettings'], context?.previousSettings);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['networkSettings'] });
    },
  });

  return {
    settings,
    isLoading,
    isError,
    error,
    updateSettings: updateSettingsMutation.mutate,
  };
};
