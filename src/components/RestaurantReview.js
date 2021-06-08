import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Rating } from './Rating';
import { TextLabel } from '@/components';
import { spacing } from '@/theme';
import { strings } from '@/localization';
import { isOwnerSelector, getUserSelector, isAdminSelector } from '@/state/selectors/UserSelectors';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: spacing.s,
      margin: spacing.xs,
      minHeight: spacing.xl * 1.5,
    },
    textContainer: {
      margin: spacing.s,
    },
    replyTextContainer: {
      marginLeft: spacing.m,
    },
    nameLabel: {
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    commentLabel: {
      fontWeight: '500',
      marginBottom: spacing.xs,
    },
    button: {
      alignSelf: 'flex-end',
      margin: spacing.xs,
      marginRight: spacing.l,
    },
    nameContainer: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
    },
  });

export const RestaurantReview = ({
  activeComment,
  activeReview,
  restaurant,
  review,
  onReply,
  onUpdate,
  onDelete,
}) => {
  const { title, comment } = review;
  const { colors } = useTheme();
  const isOwner = useSelector(isOwnerSelector);
  const isAdmin = useSelector(isAdminSelector);
  const user = useSelector(getUserSelector);

  const styles = createStyles({ colors });

  const isReviewReply = review.id === (activeReview && activeReview.id);
  const isCommentReply = (comment && comment.id) === (activeComment && activeComment.id);

  const enableReply = isOwner && !comment;

  const onCommentPress = (message, isReview, object) => () => {
    const { adminAlert } = strings.restaurant;
    Alert.alert(
      adminAlert.title,
      `${isReview ? adminAlert.messageReview : adminAlert.messageComment}:\n\n${message}`,
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

  const commentView = (author, message, rating, object) => {
    const isReview = !!rating;
    const isHighlighted = (!isReview && isCommentReply) || (isReview && isReviewReply);

    const containerStyle = isHighlighted ? { backgroundColor: colors.secondary } : {};
    const textStyle = isHighlighted ? { color: colors.background } : { color: colors.text };
    return (
      <TouchableOpacity
        style={{ ...styles.container, ...containerStyle }}
        disabled={!isAdmin}
        onPress={onCommentPress(message, isReview, object)}
      >
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <TextLabel text={author} style={{ ...styles.nameLabel, ...textStyle }} />
            {rating && <Rating rating={rating} />}
          </View>
          <TextLabel text={message} style={{ ...styles.commentLabel, ...textStyle }} />
        </View>
      </TouchableOpacity>
    );
  };

  const replyAuthor =
    user.id === (review.comment && review.comment.user) ? strings.restaurant.me : restaurant.name;

  return (
    <>
      {commentView(
        `${review.user.firstName} ${review.user.lastName}`,
        title,
        review.rating,
        review
      )}
      {comment && (
        <View style={styles.replyTextContainer}>
          {commentView(replyAuthor, comment.title, null, comment)}
        </View>
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
