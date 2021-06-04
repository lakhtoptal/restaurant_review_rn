import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

export const TextLabel = ({ text, style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <Text style={[{ color: colors.text, ...style }]} {...rest}>
      {text}
    </Text>
  );
};

TextLabel.propTypes = {
  text: PropTypes.string,
  style: Text.propTypes.style,
};
