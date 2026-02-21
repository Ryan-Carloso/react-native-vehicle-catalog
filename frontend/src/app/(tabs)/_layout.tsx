import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BrandColors } from '@/src/theme/BrandColors';
import { AppRoutes } from '@/src/utils/const';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: BrandColors.surfaceStrong,
          borderTopColor: BrandColors.border,
          borderTopWidth: 1,
          height: 84,
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
      <Tabs.Screen
        name={AppRoutes.HOME}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={AppRoutes.FAVORITES}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={AppRoutes.MY_BIDS}
        options={{
          title: 'My Bids',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
