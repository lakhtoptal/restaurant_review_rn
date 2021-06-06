import React, { useState } from 'react';
import { useRoute, useTheme } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import { createStyles } from './RestaurantDetail.styles';
import { CommentBox, NoItemsView, RestaurantReview, TextLabel } from '@/components';
import { strings } from '@/localization';

export const RestaurantDetail = () => {
  const [reviewToReply, setReviewToReply] = useState(null);

  const styles = createStyles(useTheme());
  const params = useRoute().params;

  if (!params || !params.data) {
    return <></>;
  }

  const { name, description, reviews } = params.data;

  const onReply = (review) => {
    setReviewToReply(review);
  };

  const sendReply = (text) => {
    setReviewToReply(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TextLabel text={name} style={styles.nameLabel} />
        <TextLabel text={description} />
        <TextLabel text={'Reviews:'} style={styles.reviewsLabel} />
      </View>
      {reviews && reviews.length ? (
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <RestaurantReview
              review={item}
              restaurant={params.data}
              onReply={onReply}
              reviewToReply={reviewToReply}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <NoItemsView text={strings.restaurant.noReview} />
      )}
      {reviewToReply && <CommentBox onCancel={setReviewToReply} onSubmit={sendReply} />}
    </View>
  );
};

export const navigationOptions = ({ route }) => ({
  title: route.params && route.params.data.name,
});
