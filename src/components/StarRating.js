import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { spacing } from '@/theme';

const createStyles = (readOnly) =>
  StyleSheet.create({
    ratingContainer: {
      marginVertical: readOnly ? 0 : spacing.s,
      flexDirection: 'row',
    },
    ratingStyle: {
      marginRight: spacing.xs / 2,
    },
  });

export const StarRating = ({ rating, setRating, readOnly }) => {
  const { colors } = useTheme();
  const styles = createStyles(readOnly);

  const ratingArray = Array.from(Array(Math.ceil(readOnly ? rating : 5)).keys());
  return (
    <View style={styles.ratingContainer}>
      {ratingArray.map((e) => (
        <FontAwesome
          color={colors.text}
          name={e > rating - 1 ? 'star-o' : 'star'}
          size={readOnly ? 20 : 25}
          key={e}
          onPress={() => !readOnly && setRating(e + 1)}
          style={styles.ratingStyle}
        />
      ))}
    </View>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func,
  readOnly: PropTypes.bool,
};
