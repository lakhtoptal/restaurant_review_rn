import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { spacing } from '@/theme';
import { TextLabel } from '@/components';

const createStyles = (colors) =>
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
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.ratingContainer}>
      <TextLabel text={rating} style={styles.ratingText} />
    </View>
  );
};

RatingLabel.propTypes = {
  rating: PropTypes.string,
};
