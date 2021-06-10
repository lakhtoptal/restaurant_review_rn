import _ from 'lodash';
import { createSelector } from 'reselect';
import { strings } from '@/localization';

export const getRestaurants = (state) => state.restaurant.list.map(modifyRestaurant);

export const findRestaurant = (id) =>
  createSelector(getRestaurants, (restaurants) => {
    const restaurant = _.find(restaurants, { id });
    if (!restaurant) {
      return null;
    }
    const result = _.orderBy(restaurant.reviews, ['rating'], ['desc']);
    const topRated = result.length > 0 && result[0].rating > 2 ? result[0] : null;
    const lowRated =
      result.length > 0 && result[result.length - 1].rating < 3 ? result[result.length - 1] : null;

    // Ignore the top and low rated teviews in remainder reviews.
    const filterReviews = _.filter(
      restaurant.reviews,
      (e) => ![topRated ? topRated.id : '', lowRated ? lowRated.id : ''].includes(e.id)
    );
    const lastReviews = _.orderBy(filterReviews, ['createdDate'], ['desc']);
    const sections = [];
    if (topRated) {
      sections.push({ title: strings.restaurant.detail.topRated, data: [topRated] });
    }
    if (lowRated) {
      sections.push({ title: strings.restaurant.detail.lowRated, data: [lowRated] });
    }
    if (lastReviews.length > 0) {
      sections.push({ title: strings.restaurant.detail.latestReviews, data: lastReviews });
    }
    return {
      ...restaurant,
      sections,
    };
  });

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
