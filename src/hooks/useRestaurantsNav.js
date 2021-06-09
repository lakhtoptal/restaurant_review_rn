import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { NAVIGATION } from '@/constants';
import { isOwnerSelector } from '@/state/selectors/UserSelectors';

export const useRestaurantsNav = (colors) => {
  const navigation = useNavigation();
  const isOwner = useSelector(isOwnerSelector);

  useLayoutEffect(() => {
    const createRestaurantPress = () => {
      navigation.navigate(NAVIGATION.createRestaurant);
    };

    navigation.setOptions({
      headerRight: () =>
        isOwner && (
          <Feather name="plus" size={24} color={colors.text} onPress={createRestaurantPress} />
        ),
    });
  }, [navigation, isOwner, colors]);
};
