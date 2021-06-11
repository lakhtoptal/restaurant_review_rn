import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { TextLabel } from '@/components';
import { spacing, typography } from '@/theme';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginBottom: spacing.xs / 2,
      textAlign: 'center',
      color: colors.error,
    },
  });

export const ErrorView = ({ errors }) => {
  const styles = createStyles(useTheme());

  if (errors.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {errors.map((error) => (
        <TextLabel key={error} style={[styles.text, typography.error]} text={error} />
      ))}
    </View>
  );
};

ErrorView.propTypes = {
  errors: PropTypes.array.isRequired,
};
