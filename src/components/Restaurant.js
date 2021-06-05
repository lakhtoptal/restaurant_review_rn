import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
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
    nameLabel: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    descriptionLabel: {
      marginBottom: spacing.xs,
    },
  });

export const Restaurant = ({ restuarantInfo, onRestaurantClick }) => {
  const { name, description } = restuarantInfo;
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onRestaurantClick(restuarantInfo)}>
      <View style={styles.textContainer}>
        <TextLabel text={name} style={styles.nameLabel} />
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
