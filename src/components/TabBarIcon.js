import PropTypes from 'prop-types';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NAVIGATION } from '@/constants';

export function TabBarIcon({ color, routeName }) {
  const iconSize = 25;

  const tabIcon = {
    [NAVIGATION.restaurants]: (
      <Ionicon name="ios-restaurant-outline" size={iconSize} color={color} />
    ),
    [NAVIGATION.users]: <FontAwesome name="users" size={iconSize} color={color} />,
    [NAVIGATION.profile]: <FontAwesome name="user-circle" size={iconSize} color={color} />,
  };

  return tabIcon[routeName];
}

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
