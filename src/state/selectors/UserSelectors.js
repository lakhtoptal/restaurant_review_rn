import { createSelector } from 'reselect';

export const getUser = (state) => {
  return Object.keys(state.user).length > 0 ? state.user : null;
};

const getUserRole = createSelector(getUser, (user) => user.role);

export const isAdmin = createSelector(getUserRole, (userRole) => userRole === 'admin');

export const isRestaurantowner = createSelector(getUserRole, (userRole) => userRole === 'owner');

export const isPublicUser = createSelector(getUserRole, (userRole) => userRole === 'user');
