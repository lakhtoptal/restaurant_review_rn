import React from 'react';
import { StyleSheet, TextInput, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { spacing } from '@/theme';
import { TextLabel } from '@/components';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: spacing.xs,
    paddingTop: spacing.m,
    marginBottom: spacing.s,
  },
  input: {
    paddingHorizontal: spacing.xs,
    padding: 0,
  },
  label: {
    left: spacing.xs,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
  },
});

export const TextField = ({
  containerStyle,
  onBlur,
  onFocus,
  placeholder,
  value,
  style,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {placeholder && <TextLabel style={styles.label} text={placeholder} />}
      <TextInput style={[styles.input, { color: colors.text }, style]} value={value} {...rest} />
    </View>
  );
};

TextField.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  style: TextInput.propTypes.style,
};
