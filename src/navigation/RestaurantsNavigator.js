import React from 'react';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { Restaurants, RestaurantDetail, restaurantDetailNavOptions } from '@/screens';

const Stack = createNativeStackNavigator();

export function RestaurantsNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION.restaurants} component={Restaurants} />
      <Stack.Screen
        name={NAVIGATION.restaurantDetail}
        component={RestaurantDetail}
        options={restaurantDetailNavOptions(theme)}
      />
    </Stack.Navigator>
  );
}
