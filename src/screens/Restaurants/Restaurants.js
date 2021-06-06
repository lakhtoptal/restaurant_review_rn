import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { createStyles } from '@/screens/Restaurants/Restaurants.styles';
import { NoItemsView, Restaurant } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { getRestaurantList, TYPES } from '@/state/actions/RestaurantActions';
import { getRestaurants } from '@/state/selectors/RestaurantSelectors';
import { isRestaurantowner } from '@/state/selectors/UserSelectors';
import { isLoadingSelector } from '@/state/selectors/StatusSelectors';
import { errorsSelector } from '@/state/selectors/ErrorSelectors';

export const Restaurants = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const restaurantList = useSelector(getRestaurants);
  const owner = useSelector(isRestaurantowner);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.RESTAURANT], state));
  const error = useSelector((state) => errorsSelector([TYPES.RESTAURANT], state));

  const styles = createStyles({ colors });

  useLayoutEffect(() => {
    const createRestaurantClick = () => {
      navigation.navigate(NAVIGATION.createRestaurant);
    };

    navigation.setOptions({
      headerRight: () =>
        owner && (
          <Feather
            name="plus"
            size={24}
            color={colors.text}
            backgroundColor="transparent"
            onPress={createRestaurantClick}
          />
        ),
    });
  }, [navigation, owner, colors]);

  useEffect(() => {
    dispatch(getRestaurantList());
  }, [dispatch]);

  const onRestaurantClick = (restaurant) => {
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
          <Restaurant restuarantInfo={item} onRestaurantClick={onRestaurantClick} />
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
