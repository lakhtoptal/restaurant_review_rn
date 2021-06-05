import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextLabel } from '@/components';
import { spacing } from '@/theme';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: spacing.s,
      margin: spacing.s,
      marginBottom: 0,
      minHeight: spacing.xl * 1.5,
    },
    textContainer: {
      margin: spacing.s,
    },
    nameLabel: {
      fontWeight: '500',
      marginBottom: spacing.xs,
    },
    button: {
      alignSelf: 'flex-end',
      margin: spacing.xs,
      marginRight: spacing.l,
    },
  });

export const RestaurantReview = ({ review, onReply, reviewToReply }) => {
  const { title } = review;
  const { colors } = useTheme();
  const styles = createStyles({ colors });

  const isReplyOn = review.id === (reviewToReply && reviewToReply.id);
  const containerStyle = isReplyOn ? { backgroundColor: colors.secondary } : {};
  const textStyle = isReplyOn ? { color: colors.primary } : {};
  return (
    <>
      <View style={{ ...styles.container, ...containerStyle }}>
        <View style={styles.textContainer}>
          <TextLabel text={title} style={{ ...styles.nameLabel, ...textStyle }} />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onReply(review)}>
        <TextLabel text="Reply" />
      </TouchableOpacity>
    </>
  );
};

RestaurantReview.propTypes = {
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
