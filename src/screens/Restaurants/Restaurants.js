import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { createStyles } from '@/screens/Restaurants/Restaurants.styles';
import { NoItemsView, RestaurantList } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';

export const Restaurants = () => {
  const navigation = useNavigation();
  const styles = createStyles(useTheme());

  const data = [
    {
      name: 'Punjab Food Corner',
      description: 'PBC at St Marry',
      id: '1',
    },
    {
      name: 'KFC',
      description: 'KFC at Pembina',
      id: '2',
    },
    {
      name: 'McDonalds',
      description: 'McDonalds',
      id: '3',
    },
    {
      name: 'Dairy Queen',
      description:
        'The best dairy products and cheese cakes available here. If you are around winnipeg, you can definitely try this place.',
      id: '4',
    },
  ];

  const onRestaurantClick = (restaurant) => {
    navigation.navigate(NAVIGATION.restaurantDetail, { data: restaurant });
  };

  return (
    <View style={styles.container}>
      {data.length ? (
        <RestaurantList data={data} onRestaurantClick={onRestaurantClick} />
      ) : (
        <NoItemsView text={strings.restaurants.noRestaurant} />
      )}
    </View>
  );
};
