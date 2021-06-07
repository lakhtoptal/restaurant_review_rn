import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Rating } from './Rating';
import { TextLabel } from '@/components';
import { spacing } from '@/theme';
import { strings } from '@/localization';
import { isOwnerSelector, getUserSelector } from '@/state/selectors/UserSelectors';

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

export const RestaurantReview = ({ restaurant, review, onReply, reviewToReply }) => {
  const { title, comment } = review;
  const { colors } = useTheme();
  const isOwner = useSelector(isOwnerSelector);
  const user = useSelector(getUserSelector);

  const styles = createStyles({ colors });

  const isReplyOn = review.id === (reviewToReply && reviewToReply.id);
  const containerStyle = isReplyOn ? { backgroundColor: colors.secondary } : {};
  const textStyle = isReplyOn ? { color: colors.text } : {};
  const enableReply = isOwner && !comment;

  const commentView = (author, message, rating) => (
    <View style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <TextLabel text={author} style={{ ...styles.nameLabel, ...textStyle }} />
          {rating && <Rating rating={rating} />}
        </View>
        <TextLabel text={message} style={{ ...styles.commentLabel, ...textStyle }} />
      </View>
    </View>
  );

  const replyAuthor =
    user.id === (review.comment && review.comment.user) ? strings.restaurant.me : restaurant.name;

  return (
    <>
      {commentView(`${review.user.firstName} ${review.user.lastName}`, title, review.rating)}
      {comment && (
        <View style={styles.replyTextContainer}>{commentView(replyAuthor, comment.title)}</View>
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
  reviewToReply: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onReply: PropTypes.func,
};
