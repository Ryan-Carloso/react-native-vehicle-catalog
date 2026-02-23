import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppRoutes } from '@/src/utils/const';

const queryClient: QueryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name={AppRoutes.TABS} options={{ headerShown: false }} />
        <Stack.Screen name={AppRoutes.DETAIL} options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </QueryClientProvider>
  );
};

export default RootLayout;
