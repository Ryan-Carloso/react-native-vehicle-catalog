import { Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';

import { BrandColors } from '@/src/theme/BrandColors';
import { SCREENS } from '@/src/utils/const';

export default function TabsLayout() {
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 1024;

  if (isLargeScreen) {
    return (
      <Drawer
        screenOptions={{
          drawerType: 'permanent',
          drawerStyle: {
            backgroundColor: BrandColors.surfaceStrong,
            width: 320,
            borderRightWidth: 1,
            borderRightColor: BrandColors.border,
          },
          drawerInactiveTintColor: BrandColors.textMuted,
          drawerActiveTintColor: BrandColors.warning,
          drawerActiveBackgroundColor: 'rgba(234, 219, 47, 0.15)',
          drawerItemStyle: {
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 12,
            marginBottom: 8,
          },
          drawerLabelStyle: {
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'Courier',
          },
          headerShown: false,
        }}
      >
        {SCREENS.map((screen) => (
          <Drawer.Screen
            key={screen.name}
            name={screen.name}
            options={{
              title: screen.title,
              drawerIcon: ({ color, size }) => (
                <Ionicons name={screen.iconName} size={size} color={color} />
              ),
            }}
          />
        ))}
      </Drawer>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: BrandColors.surfaceStrong,
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
      {SCREENS.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={screen.iconName} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
