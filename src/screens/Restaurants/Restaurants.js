import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { createStyles } from '@/screens/Restaurants/Restaurants.styles';
import { NoItemsView, Restaurant } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { getRestaurantList, TYPES } from '@/state/actions/RestaurantActions';
import { getRestaurants } from '@/state/selectors/RestaurantSelectors';
import { isLoadingSelector } from '@/state/selectors/StatusSelectors';
import { errorsSelector } from '@/state/selectors/ErrorSelectors';
import { useRestaurantsNav } from '@/hooks';

export const Restaurants = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();
  useRestaurantsNav(colors);

  const restaurantList = _.orderBy(useSelector(getRestaurants), ['averageRating'], ['desc']);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.RESTAURANT], state));
  const error = useSelector((state) => errorsSelector([TYPES.RESTAURANT], state));

  const styles = createStyles({ colors });

  useEffect(() => {
    dispatch(getRestaurantList());
  }, [dispatch]);

  const onRestaurantPress = (restaurant) => {
    navigation.navigate(NAVIGATION.restaurantDetail, { data: restaurant });
  };

  const onRefresh = () => dispatch(getRestaurantList());
  const isError = error && error.length > 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurantList}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <Restaurant restuarantInfo={item} onRestaurantPress={onRestaurantPress} />
        )}
        ListEmptyComponent={() => (
          <NoItemsView
            text={isError ? error[0] : strings.restaurant.noRestaurant}
            isError={isError}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
