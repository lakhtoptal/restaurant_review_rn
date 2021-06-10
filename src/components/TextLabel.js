import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { typography } from '@/theme';

export const TextLabel = ({ text, style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <Text style={[{ color: colors.text }, typography.label, style]} {...rest}>
      {text}
    </Text>
  );
};

TextLabel.propTypes = {
  text: PropTypes.string,
  style: Text.propTypes.style,
};
