import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { RatingLabel, TextLabel } from '@/components';
import { shadow, spacing, typography } from '@/theme';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderRadius: spacing.s,
      margin: spacing.xs,
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
    descriptionLabel: {
      marginBottom: spacing.xs,
      maxHeight: 120,
    },
  });

export const Restaurant = ({ restuarantInfo, onRestaurantPress }) => {
  const { name, description, averageRating, numberOfRatings } = restuarantInfo;
  const styles = createStyles(useTheme());

  return (
    <TouchableOpacity style={styles.container} onPress={() => onRestaurantPress(restuarantInfo)}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <TextLabel style={typography.title} text={name} />
          {numberOfRatings > 0 && <RatingLabel rating={averageRating} />}
        </View>
        <TextLabel style={styles.descriptionLabel} text={description} />
      </View>
    </TouchableOpacity>
  );
};

Restaurant.propTypes = {
  restuarantInfo: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onRestaurantPress: PropTypes.func,
};
