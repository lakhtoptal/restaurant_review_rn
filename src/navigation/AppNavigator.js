import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { TabBarIcon } from '@/components';
import { NAVIGATION } from '@/constants';
import { RestaurantsNavigator } from '@/navigation/RestaurantsNavigator';
import { ProfileNavigator } from '@/navigation/ProfileNavigator';
import { UsersNavigator } from '@/navigation/UsersNavigator';
import { isAdminSelector } from '@/state/selectors/UserSelectors';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { colors } = useTheme();
  const isAdmin = useSelector(isAdminSelector);

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
      {isAdmin && <Tab.Screen name={NAVIGATION.users} component={UsersNavigator} />}
      <Tab.Screen name={NAVIGATION.profile} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
