import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { spacing } from '@/theme';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: spacing.xs,
    paddingTop: spacing.m,
    marginBottom: spacing.s,
  },
  input: {
    paddingHorizontal: spacing.xs,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: spacing.xs,
  },
});

export function TextField({ onBlur, onFocus, placeholder, value, ...rest }) {
  const { colors } = useTheme();

  const placeholderStyle = {
    color: colors.text,
    opacity: 0.7,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, placeholderStyle]}>{placeholder}</Text>
      <TextInput style={[styles.input, { color: colors.text }]} value={value} {...rest} />
    </View>
  );
}

TextField.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};
