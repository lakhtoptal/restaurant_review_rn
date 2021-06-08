import _ from 'lodash';
import { createSelector } from 'reselect';

export const getUserSelector = (state) => {
  return Object.keys(state.user.loggedInUser).length > 0 ? state.user.loggedInUser : null;
};

const getUserList = (state) => state.user.userList || [];

const getUserRole = createSelector(getUserSelector, (user) => user.role);

export const isAdminSelector = createSelector(getUserRole, (userRole) => userRole === 'admin');

export const isOwnerSelector = createSelector(getUserRole, (userRole) => userRole === 'owner');

export const isPublicUserSelector = createSelector(getUserRole, (userRole) => userRole === 'user');

export const getUserListSelector = createSelector(getUserSelector, getUserList, (user, userList) =>
  _.filter(userList, (e) => e.id !== user.id)
);

export const findUser = (id) =>
  createSelector(getUserListSelector, (users) => _.find(users, { id }));
