import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { createStyles } from '@/screens/Restaurants/Restaurants.styles';
import { NoItemsView, Restaurant } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { RestaurantController } from '@/controllers';

export const Restaurants = () => {
  const navigation = useNavigation();
  const styles = createStyles(useTheme());

  const data = [
    {
      name: 'Punjab Food Corner',
      description: 'PBC at St Marry',
      id: '1',
      reviews: [
        {
          title: 'Great restaurant',
          rating: 5,
          id: '1',
        },
        {
          title: 'Bad restaurant',
          rating: 2,
          id: '2',
        },
      ],
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
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Restaurant restuarantInfo={item} onRestaurantClick={onRestaurantClick} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <NoItemsView text={strings.restaurant.noRestaurant} />
      )}
    </View>
  );
};
