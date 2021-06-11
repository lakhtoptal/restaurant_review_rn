import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { TextLabel } from '@/components';
import { spacing } from '@/theme';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    ratingContainer: {
      backgroundColor: colors.secondary,
      marginLeft: 'auto',
      marginRight: spacing.xs,
      height: 30,
      minWidth: 40,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ratingText: {
      color: colors.background,
    },
  });

export const RatingLabel = ({ rating }) => {
  const styles = createStyles(useTheme());

  return (
    <View style={styles.ratingContainer}>
      <TextLabel style={styles.ratingText} text={rating} />
    </View>
  );
};

RatingLabel.propTypes = {
  rating: PropTypes.string,
};
