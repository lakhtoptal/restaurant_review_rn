import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { Restaurant } from './Restaurant';

export const RestaurantList = ({ data, onRestaurantClick }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Restaurant restuarantInfo={item} onRestaurantClick={onRestaurantClick} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

RestaurantList.propTypes = {
  data: PropTypes.array,
  onRestaurantClick: PropTypes.func,
};
