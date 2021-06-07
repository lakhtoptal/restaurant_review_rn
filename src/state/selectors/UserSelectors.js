import { createSelector } from 'reselect';

export const getUserSelector = (state) => {
  return Object.keys(state.user).length > 0 ? state.user : null;
};

const getUserRole = createSelector(getUserSelector, (user) => user.role);

export const isAdminSelector = createSelector(getUserRole, (userRole) => userRole === 'admin');

export const isOwnerSelector = createSelector(getUserRole, (userRole) => userRole === 'owner');

export const isPublicUserSelector = createSelector(getUserRole, (userRole) => userRole === 'user');
