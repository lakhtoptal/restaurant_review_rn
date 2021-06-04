import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import { createStyles } from './styles';
import { TextLabel } from '@/components';

export const RestaurantInfo = ({ data }) => {
  const { name, description } = data;
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TextLabel text={name} style={styles.nameLabel} />
      <TextLabel text={description} />
      <TextLabel text={'Reviews:'} style={styles.reviewsLabel} />
    </View>
  );
};

RestaurantInfo.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};
