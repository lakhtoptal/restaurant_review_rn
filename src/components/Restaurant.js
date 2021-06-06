import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Rating } from './Rating';
import { TextLabel } from '@/components';
import { shadow, spacing } from '@/theme';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderRadius: spacing.s,
      margin: spacing.s,
      marginBottom: 0,
      minHeight: spacing.xl * 2,
      ...shadow.primary,
    },
    textContainer: {
      margin: spacing.xs,
    },
    nameContainer: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
    },
    nameLabel: {
      fontSize: 18,
      fontWeight: '600',
    },
    descriptionLabel: {
      marginBottom: spacing.xs,
    },
  });

export const Restaurant = ({ restuarantInfo, onRestaurantClick }) => {
  const { name, description, reviews } = restuarantInfo;
  const theme = useTheme();
  const styles = createStyles(theme);

  const ratingSum = reviews.map((e) => e.rating).reduce((a, b) => a + b, 0);
  const rating = ratingSum / reviews.length || 0;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onRestaurantClick(restuarantInfo)}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <TextLabel text={name} style={styles.nameLabel} />
          <Rating rating={rating} />
        </View>
        <TextLabel text={description} style={styles.descriptionLabel} />
      </View>
    </TouchableOpacity>
  );
};

Restaurant.propTypes = {
  restuarantInfo: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onRestaurantClick: PropTypes.func,
};
