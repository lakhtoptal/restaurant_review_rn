import React, { useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NAVIGATION } from '@/constants';
import { isAdminSelector } from '@/state/selectors/UserSelectors';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { deleteRestaurant } from '@/state/actions/RestaurantActions';

export const useRestaurantDetailNav = (restaurant, colors) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAdmin = useSelector(isAdminSelector);

  useLayoutEffect(() => {
    const updateRestaurantPress = () => {
      navigation.navigate(NAVIGATION.createRestaurant, { data: restaurant });
    };

    const deleteRestaurantPress = () => {
      const { alert } = strings.common;
      Alert.alert(alert.title, strings.restaurant.deleteMessage, [
        {
          text: alert.cancel,
          style: 'cancel',
        },
        {
          text: alert.delete,
          onPress: () => {
            dispatch(deleteRestaurant(restaurant.id)).then((success) => {
              if (success) {
                navigation.goBack();
              }
            });
          },
          style: 'destructive',
        },
      ]);
    };

    navigation.setOptions({
      title: restaurant.name,
      headerRight: () =>
        isAdmin && (
          <>
            <Feather name="edit" size={24} color={colors.text} onPress={updateRestaurantPress} />
            <Spacer />
            <AntDesign
              name="delete"
              size={24}
              color={colors.text}
              onPress={deleteRestaurantPress}
            />
          </>
        ),
    });
  }, [dispatch, navigation, isAdmin, colors, restaurant]);
};
