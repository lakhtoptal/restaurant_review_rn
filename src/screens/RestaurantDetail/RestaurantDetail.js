import { useRoute, useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStyles } from './RestaurantDetail.styles';
import { RestaurantInfo } from '@/components';

export const RestaurantDetail = () => {
  const styles = createStyles(useTheme());
  const { data } = useRoute().params;

  return (
    <View style={styles.container}>
      <RestaurantInfo data={data} />
    </View>
  );
};

export const navigationOptions =
  (theme) =>
  ({ navigation, route }) => ({
    title: route.params.data.name,
    headerLeft: () => (
      <Icon name="arrow-back" size={25} color={theme.colors.text} onPress={navigation.goBack} />
    ),
  });
