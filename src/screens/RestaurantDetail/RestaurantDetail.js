import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { createStyles } from './RestaurantDetail.styles';
import { CommentBox, NoItemsView, RestaurantReview, TextLabel } from '@/components';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { isAdmin } from '@/state/selectors/UserSelectors';
import { findRestaurant } from '@/state/selectors/RestaurantSelectors';
import { upsertComment } from '@/state/actions/CommentActions';

export const RestaurantDetail = () => {
  const [reviewToReply, setReviewToReply] = useState(null);

  const { colors } = useTheme();
  const styles = createStyles({ colors });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const admin = useSelector(isAdmin);
  const params = useRoute().params;
  const restaurant = useSelector(findRestaurant(params.data.id));

  useLayoutEffect(() => {
    const updateRestaurantClick = () => {
      navigation.navigate(NAVIGATION.createRestaurant, { data: restaurant });
    };

    navigation.setOptions({
      title: restaurant.name,
      headerRight: () =>
        admin && (
          <Feather
            name="edit"
            size={24}
            color={colors.text}
            backgroundColor="transparent"
            onPress={updateRestaurantClick}
          />
        ),
    });
  }, [navigation, admin, colors, restaurant]);

  const { name, description, reviews } = restaurant;

  const onReply = (review) => {
    setReviewToReply(review);
  };

  const sendReply = (text) => {
    dispatch(upsertComment({ title: text, review: reviewToReply.id }, false));
    setReviewToReply(null);
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.infoContainer}>
            <TextLabel text={name} style={styles.nameLabel} />
            <TextLabel text={description} />
            <TextLabel text={'Reviews:'} style={styles.reviewsLabel} />
          </View>
        )}
        data={reviews}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <RestaurantReview
            review={item}
            restaurant={restaurant}
            onReply={onReply}
            reviewToReply={reviewToReply}
          />
        )}
        ListEmptyComponent={() => <NoItemsView text={strings.restaurant.noReview} />}
        keyExtractor={(item) => item.id}
      />
      {reviewToReply && <CommentBox onCancel={setReviewToReply} onSubmit={sendReply} />}
    </>
  );
};
