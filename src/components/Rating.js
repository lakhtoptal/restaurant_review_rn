import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { spacing } from '@/theme';

const createStyles = () =>
  StyleSheet.create({
    ratingContainer: {
      marginLeft: 'auto',
      marginRight: spacing.xs,
      flexDirection: 'row',
    },
    ratingStyle: {
      marginRight: spacing.xs / 2,
    },
  });

export const Rating = ({ rating }) => {
  const { colors } = useTheme();
  const styles = createStyles();

  const isHalf = Math.ceil(rating) !== Math.floor(rating);
  const ratingArray = rating > 0 ? Array.from(Array(Math.ceil(rating)).keys()) : [];
  return (
    <View style={styles.ratingContainer}>
      {ratingArray.map((e) => (
        <FontAwesome
          name={isHalf && e === ratingArray.length - 1 ? 'star-half' : 'star'}
          size={15}
          key={e}
          color={colors.text}
          style={styles.ratingStyle}
        />
      ))}
    </View>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};
