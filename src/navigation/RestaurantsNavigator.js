import React from 'react';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { NAVIGATION } from '@/constants';
import {
  CreateRestaurant,
  Restaurants,
  RestaurantDetail,
  restaurantDetailNavOptions,
} from '@/screens';

const Stack = createNativeStackNavigator();

export function RestaurantsNavigator() {
  const theme = useTheme();

  const detailOption = detailNavigationOptions(theme);

  return (
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION.restaurants} component={Restaurants} />
      <Stack.Screen
        name={NAVIGATION.createRestaurant}
        component={CreateRestaurant}
        options={detailOption()}
      />
      <Stack.Screen
        name={NAVIGATION.restaurantDetail}
        component={RestaurantDetail}
        options={(options) => detailOption(restaurantDetailNavOptions(options))(options)}
      />
    </Stack.Navigator>
  );
}

export const detailNavigationOptions =
  (theme) =>
  (newOptions) =>
  ({ navigation }) => ({
    ...newOptions,
    headerLeft: () => (
      <Icon name="arrow-back" size={25} color={theme.colors.text} onPress={navigation.goBack} />
    ),
  });
