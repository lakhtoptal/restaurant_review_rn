import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import { NAVIGATION } from '@/constants';
import { isOwnerSelector } from '@/state/selectors/UserSelectors';
import { Spacer } from '@/components';
import { getRestaurantFilters, getRestaurants } from '@/state/selectors/RestaurantSelectors';

export const useRestaurantList = (colors) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigation = useNavigation();
  const isOwner = useSelector(isOwnerSelector);
  const restaurantList = _.orderBy(useSelector(getRestaurants), ['averageRating'], ['desc']);
  const filterList = useSelector(getRestaurantFilters);
  const containFilters = selectedFilters && selectedFilters.length > 0;

  useLayoutEffect(() => {
    const createRestaurantPress = () => {
      navigation.navigate(NAVIGATION.createRestaurant);
    };

    const filterPress = () => {
      setShowFilter(true);
    };

    navigation.setOptions({
      headerRight: () => (
        <>
          {isOwner && (
            <>
              <Feather name="plus" size={24} color={colors.text} onPress={createRestaurantPress} />
              <Spacer />
            </>
          )}
          {filterList.length > 0 && (
            <Feather
              name="filter"
              size={24}
              color={containFilters ? colors.error : colors.text}
              onPress={filterPress}
            />
          )}
        </>
      ),
    });
  }, [navigation, isOwner, colors, filterList, containFilters]);

  const onCloseFilter = () => setShowFilter(false);

  const selectFilter = (filter) => {
    setSelectedFilters((prev) => {
      const index = prev.indexOf(filter);
      if (index >= 0) {
        const array = [...prev];
        array.splice(index, 1);
        return array;
      }
      return [...prev, filter];
    });
  };

  const filterRestaurantList = containFilters
    ? restaurantList.filter((e) => selectedFilters.includes(e.averageRatingNumber))
    : restaurantList;

  return {
    filterList,
    restaurantList: filterRestaurantList,
    selectedFilters,
    selectFilter,
    showFilter,
    onCloseFilter,
  };
};
