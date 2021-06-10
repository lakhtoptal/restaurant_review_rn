import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { TextLabel } from '@/components';

const createStyles = (colors) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      borderColor: colors.border,
      borderRadius: 5,
      borderWidth: 1,
      justifyContent: 'center',
      padding: 10,
      width: '100%',
    },
  });

export const Button = ({ style, textStyle, title, ...rest }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <TextLabel style={textStyle} text={title} />
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};
