import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { CommentView, TextLabel } from '@/components';
import { spacing } from '@/theme';
import { strings } from '@/localization';
import { isOwnerSelector, isAdminSelector } from '@/state/selectors/UserSelectors';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    margin: spacing.xs,
    marginRight: spacing.l,
  },
});

export const RestaurantReview = ({
  activeComment,
  activeReview,
  review,
  onReply,
  onUpdate,
  onDelete,
}) => {
  const { colors } = useTheme();
  const isOwner = useSelector(isOwnerSelector);
  const isAdmin = useSelector(isAdminSelector);

  const isReviewReply = review.id === (activeReview && activeReview.id);
  const isCommentReply =
    (review.comment && review.comment.id) === (activeComment && activeComment.id);

  const enableReply = isOwner && !review.comment;

  const onCommentPress = (isReview, object) => () => {
    const { adminAlert } = strings.restaurant;
    Alert.alert(
      adminAlert.title,
      `${isReview ? adminAlert.messageReview : adminAlert.messageComment}:\n\n${object.title}`,
      [
        {
          text: strings.common.alert.delete,
          onPress: () => onDelete(object, isReview),
          style: 'destructive',
        },
        {
          text: strings.common.alert.edit,
          onPress: () => onUpdate(object, isReview),
        },
        {
          text: strings.common.alert.cancel,
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <>
      <CommentView
        colors={colors}
        commentObject={review}
        isReview
        isSelected={isReviewReply}
        enablePress={isAdmin}
        onPress={onCommentPress(true, review)}
      />
      {review.comment && (
        <CommentView
          colors={colors}
          commentObject={review.comment}
          isReview={false}
          isSelected={isCommentReply}
          enablePress={isAdmin}
          onPress={onCommentPress(false, review.comment)}
        />
      )}
      {enableReply && (
        <TouchableOpacity style={styles.button} onPress={() => onReply(review)}>
          <TextLabel text={strings.restaurant.reply} />
        </TouchableOpacity>
      )}
    </>
  );
};

RestaurantReview.propTypes = {
  restuarant: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  review: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  activeReview: PropTypes.shape({
    title: PropTypes.string,
    rating: PropTypes.number,
  }),
  activeComment: PropTypes.shape({
    title: PropTypes.string,
  }),
  onReply: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};
