import { Tabs } from 'expo-router';

import { BrandColors } from '@/src/theme/BrandColors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: BrandColors.surfaceStrong,
          borderTopColor: BrandColors.border,
          borderTopWidth: 1,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: BrandColors.warning,
        tabBarInactiveTintColor: BrandColors.textMuted,
        tabBarLabelStyle: {
          fontFamily: 'Courier',
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="Favorites" options={{ title: 'Favorites' }} />
      <Tabs.Screen name="MyBids" options={{ title: 'My Bids' }} />
    </Tabs>
  );
}
