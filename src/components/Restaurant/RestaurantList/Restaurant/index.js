import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
import { TextLabel } from '@/components';

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
