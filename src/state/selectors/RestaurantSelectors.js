import _ from 'lodash';
import { createSelector } from 'reselect';

export const getRestaurants = (state) => state.restaurant.list.map(modifyRestaurant);

export const findRestaurant = (id) =>
  createSelector(getRestaurants, (restaurants) => _.find(restaurants, { id }));

// Modify restaurant object to normalize data/cacludations we needed.
const modifyRestaurant = (restaurant) => {
  const ratingSum = restaurant.reviews.map((e) => e.rating).reduce((a, b) => a + b, 0);
  const numberOfRatings = restaurant.reviews.length;
  const averageRating = (ratingSum / numberOfRatings || 0).toFixed(1);

  return {
    ...restaurant,
    averageRating,
    numberOfRatings,
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
  };
};
