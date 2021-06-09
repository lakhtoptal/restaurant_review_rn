import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useTheme } from '@react-navigation/native';
import { createStyles } from './RestaurantDetail.styles';
import {
  Button,
  CommentBox,
  NoItemsView,
  RatingLabel,
  RestaurantReview,
  ReviewModal,
  TextLabel,
} from '@/components';
import { strings } from '@/localization';
import { getUserSelector, isPublicUserSelector } from '@/state/selectors/UserSelectors';
import { findRestaurant } from '@/state/selectors/RestaurantSelectors';
import { deleteComment, upsertComment } from '@/state/actions/CommentActions';
import { deleteReview, upsertReview } from '@/state/actions/ReviewActions';
import { useRestaurantDetailNav } from '@/hooks';

export const RestaurantDetail = () => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewToReply, setReviewToReply] = useState(null);
  const [updateReview, setUpdateReview] = useState(null);
  const [updateComment, setUpdateComment] = useState(null);

  const { colors } = useTheme();
  const styles = createStyles({ colors });
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const isPublicUser = useSelector(isPublicUserSelector);
  const params = useRoute().params;
  const restaurant = useSelector(findRestaurant(params.data.id));
  const { name, description, reviews, numberOfRatings, averageRating } = restaurant;

  // Show navigation options.
  useRestaurantDetailNav(restaurant, colors);

  const enableReview = isPublicUser && !_.find(reviews, (e) => e.user.id === user.id);

  // Reply/Comment actions
  const onReply = (review) => {
    setReviewToReply(review);
  };

  const onCancelComment = () => {
    setReviewToReply(null);
    setUpdateComment(null);
  };

  const sendComment = (title) => {
    let payload = { title };
    if (updateComment) {
      payload.id = updateComment.id;
    } else {
      payload.review = reviewToReply.id;
    }
    dispatch(upsertComment(payload, !!updateComment));
    onCancelComment();
  };

  // Review actions
  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setUpdateReview(null);
  };

  const sendReview = (payload) => {
    if (updateReview) {
      payload.id = updateReview.id;
    } else {
      payload.restaurant = restaurant.id;
    }
    dispatch(upsertReview(payload, !!updateReview));
    closeReviewModal();
  };

  const reviewButtonPressed = () => {
    setReviewModalOpen(true);
  };

  // Update/Delete: Admin controls.
  const onUpdate = (object, isReview) => {
    if (isReview) {
      setUpdateReview(object);
      setReviewModalOpen(true);
    } else {
      setUpdateComment(object);
    }
  };

  const onDelete = (object, isReview) => {
    if (isReview) {
      dispatch(deleteReview(object.id));
    } else {
      dispatch(deleteComment(object.id));
    }
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.infoContainer}>
            <View style={styles.nameContainer}>
              <TextLabel text={name} style={styles.nameLabel} />
              {numberOfRatings > 0 && <RatingLabel rating={averageRating} />}
            </View>
            <TextLabel text={description} />
            <TextLabel text={'Reviews:'} style={styles.reviewsLabel} />
          </View>
        )}
        ListFooterComponent={() =>
          enableReview ? (
            <View style={styles.reviewButton}>
              <Button onPress={reviewButtonPressed} title={strings.review.reviewTitle} />
            </View>
          ) : (
            <></>
          )
        }
        data={reviews}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <RestaurantReview
            activeComment={updateComment}
            activeReview={updateReview || reviewToReply}
            review={item}
            onReply={onReply}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        )}
        ListEmptyComponent={() => <NoItemsView text={strings.restaurant.noReview} />}
        keyExtractor={(item) => item.id}
      />
      {(reviewToReply || updateComment) && (
        <CommentBox
          onCancel={onCancelComment}
          onSubmit={sendComment}
          value={updateComment ? updateComment.title : ''}
        />
      )}
      <ReviewModal
        visible={reviewModalOpen}
        onClose={closeReviewModal}
        onSubmit={sendReview}
        isUpdate={!!updateReview}
        initialData={updateReview || null}
      />
    </>
  );
};
