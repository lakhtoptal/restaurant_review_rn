import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TabBarIcon } from '@/components';
import { NAVIGATION } from '@/constants';
import { RestaurantsNavigator } from '@/navigation/RestaurantsNavigator';
import { ProfileNavigator } from '@/navigation/ProfileNavigator';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => <TabBarIcon color={color} routeName={route.name} />,
      })}
      tabBarOptions={{
        activeTintColor: colors.activeTab,
        inactiveTintColor: colors.inactiveTab,
      }}
    >
      <Tab.Screen name={NAVIGATION.restaurants} component={RestaurantsNavigator} />
      <Tab.Screen name={NAVIGATION.profile} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
