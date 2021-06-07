import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { spacing as themeSpacing } from '@/theme';

const styles = StyleSheet.create({
  spacer: (spacing) => ({
    margin: themeSpacing[spacing || 'xs'],
  }),
});

export const Spacer = ({ children, style, spacing }) => {
  return <View style={[styles.spacer(spacing), style]}>{children}</View>;
};

Spacer.propTypes = {
  spacing: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
};
