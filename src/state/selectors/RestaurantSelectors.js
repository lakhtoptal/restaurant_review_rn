import _ from 'lodash';
import { createSelector } from 'reselect';

export const getRestaurants = (state) => state.restaurant.list;

export const findRestaurant = (id) =>
  createSelector(getRestaurants, (restaurants) => _.find(restaurants, { id }));
