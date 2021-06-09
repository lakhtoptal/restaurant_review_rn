import _ from 'lodash';
import { createSelector } from 'reselect';

export const getRestaurants = (state) => state.restaurant.list.map(normalizeRestaurant);

export const findRestaurant = (id) =>
  createSelector(getRestaurants, (restaurants) => _.find(restaurants, { id }));

// Modify restaurant object to normalize data/cacludations we needed.
const normalizeRestaurant = (restaurant) => ({
  ...restaurant,
  reviews: restaurant.reviews.map((review) => ({
    ...review,
    author: `${review.user.firstName} ${review.user.lastName}`,
    comment: review.comment
      ? {
          ...review.comment,
          author: restaurant.name,
        }
      : null,
  })),
});
