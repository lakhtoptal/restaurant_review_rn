import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import Assets from '@/assets';
import { NAVIGATION } from '@/constants';

export function TabBarIcon({ color, routeName }) {
  const tabIcon = {
    [NAVIGATION.home]: Assets().homeIcon,
    [NAVIGATION.profile]: Assets().settingsIcon,
  };

  return (
    <Image
      accessibilityIgnoresInvertColors
      source={tabIcon[routeName]}
      style={{ tintColor: color }}
    />
  );
}

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
