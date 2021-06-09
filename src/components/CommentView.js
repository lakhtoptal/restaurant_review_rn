import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { StarRating, TextLabel } from '@/components';
import { spacing } from '@/theme';
import { strings } from '@/localization';

const createStyles = ({ colors, isSelected, isReview }) => {
  const textStyle = {
    color: isSelected ? colors.background : colors.text,
  };
  return StyleSheet.create({
    container: {
      backgroundColor: isSelected ? colors.secondary : colors.primary,
      borderRadius: spacing.s,
      justifyContent: 'center',
      margin: spacing.xs,
      minHeight: spacing.xl * 1.5,
      marginLeft: isReview ? spacing.xs : spacing.l,
    },
    textContainer: {
      margin: spacing.s,
    },
    nameContainer: {
      flexDirection: 'row',
      marginBottom: spacing.s,
    },
    nameLabel: {
      fontSize: 17,
      fontWeight: 'bold',
      ...textStyle,
    },
    dateLabel: {
      ...textStyle,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    commentLabel: {
      fontWeight: '500',
      marginBottom: spacing.xs,
      ...textStyle,
    },
    ratingContainer: {
      marginLeft: 'auto',
    },
  });
};

export const CommentView = ({
  colors,
  commentObject,
  isReview,
  isSelected,
  enablePress,
  onPress,
}) => {
  const styles = createStyles({ colors, isSelected, isReview });

  const formatDate = moment(commentObject.visitedDate).format('MMMM DD YYYY');
  return (
    <TouchableOpacity style={styles.container} disabled={!enablePress} onPress={onPress}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <TextLabel text={commentObject.author} style={styles.nameLabel} />
          {isReview && (
            <View style={styles.ratingContainer}>
              <StarRating rating={commentObject.rating} readOnly />
            </View>
          )}
        </View>
        <TextLabel text={`${strings.review.visitLabel} ${formatDate}`} style={styles.dateLabel} />
        <TextLabel text={commentObject.title} style={styles.commentLabel} />
      </View>
    </TouchableOpacity>
  );
};

CommentView.propTypes = {
  colors: PropTypes.object,
  commentObject: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    rating: PropTypes.number,
  }),
  isReview: PropTypes.bool,
  isSelected: PropTypes.bool,
  enablePress: PropTypes.bool,
  onPress: PropTypes.func,
};
