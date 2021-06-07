import React, { useState, useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { createStyles } from './RestaurantDetail.styles';
import {
  Button,
  CommentBox,
  NoItemsView,
  RestaurantReview,
  ReviewModal,
  TextLabel,
} from '@/components';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import {
  getUserSelector,
  isAdminSelector,
  isPublicUserSelector,
} from '@/state/selectors/UserSelectors';
import { findRestaurant } from '@/state/selectors/RestaurantSelectors';
import { upsertComment } from '@/state/actions/CommentActions';
import { upsertReview } from '@/state/actions/ReviewActions';

export const RestaurantDetail = () => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewToReply, setReviewToReply] = useState(null);

  const { colors } = useTheme();
  const styles = createStyles({ colors });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(getUserSelector);
  const isAdmin = useSelector(isAdminSelector);
  const isPublicUser = useSelector(isPublicUserSelector);
  const params = useRoute().params;
  const restaurant = useSelector(findRestaurant(params.data.id));
  const { name, description, reviews } = restaurant;

  const enableReview = isPublicUser && !_.find(reviews, (e) => e.user.id === user.id);

  useLayoutEffect(() => {
    const updateRestaurantClick = () => {
      navigation.navigate(NAVIGATION.createRestaurant, { data: restaurant });
    };

    navigation.setOptions({
      title: restaurant.name,
      headerRight: () =>
        isAdmin && (
          <Feather
            name="edit"
            size={24}
            color={colors.text}
            backgroundColor="transparent"
            onPress={updateRestaurantClick}
          />
        ),
    });
  }, [navigation, isAdmin, colors, restaurant]);

  // Reply actions
  const onReply = (review) => {
    setReviewToReply(review);
  };

  const sendReply = (title) => {
    dispatch(upsertComment({ title, review: reviewToReply.id }, false));
    setReviewToReply(null);
  };

  // Review actions
  const closeReviewModal = () => setReviewModalOpen(false);
  const sendReview = (title, rating) => {
    closeReviewModal();
    dispatch(upsertReview({ title, rating, restaurant: restaurant.id }, false));
  };

  const reviewButtonClicked = () => {
    setReviewModalOpen(true);
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
        ListFooterComponent={() =>
          enableReview ? (
            <View style={styles.reviewButton}>
              <Button onPress={reviewButtonClicked} title={strings.restaurant.reviewTitle} />
            </View>
          ) : (
            <></>
          )
        }
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
      <ReviewModal visible={reviewModalOpen} onClose={closeReviewModal} onSubmit={sendReview} />
    </>
  );
};
