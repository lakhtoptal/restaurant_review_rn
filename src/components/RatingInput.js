import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { spacing } from '@/theme';

const createStyles = () =>
  StyleSheet.create({
    ratingContainer: {
      marginVertical: spacing.s,
      flexDirection: 'row',
    },
    ratingStyle: {
      marginRight: spacing.xs / 2,
    },
  });

export const RatingInput = ({ rating, setRating }) => {
  const { colors } = useTheme();
  const styles = createStyles();

  const ratingArray = Array.from(Array(Math.ceil(5)).keys());
  return (
    <View style={styles.ratingContainer}>
      {ratingArray.map((e) => (
        <FontAwesome
          color={colors.text}
          name={e > rating - 1 ? 'star-o' : 'star'}
          size={25}
          key={e}
          onPress={() => setRating(e + 1)}
          style={styles.ratingStyle}
        />
      ))}
    </View>
  );
};

RatingInput.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func,
};
