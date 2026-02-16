import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ReactElement } from 'react';

const queryClient: QueryClient = new QueryClient();

export default function RootLayout(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="vehicle/[id]" options={{ title: 'Vehicle Details' }} />
      </Stack>
      <StatusBar style="dark" />
    </QueryClientProvider>
  );
}
