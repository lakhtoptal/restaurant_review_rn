import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { Button, ErrorView, Spacer, StarRating, TextLabel } from '@/components';
import { shadow, spacing } from '@/theme';
import { strings } from '@/localization';
import { PlatformHelper } from '@/constants';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    safeArea: {
      flex: 1,
    },
    listContainer: {
      flexGrow: 1,
    },
    closeButton: {
      position: 'absolute',
      top: spacing.xs,
      right: spacing.xs,
    },
    modalView: {
      marginTop: -spacing.xl,
      width: PlatformHelper.windowWidth * 0.85,
      backgroundColor: colors.background,
      padding: spacing.m,
      justifyContent: 'space-between',
      alignItems: 'center',
      ...shadow.primary,
    },
    titleHeader: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    visitLabel: {
      fontSize: 18,
    },
    descriptionField: {
      alignSelf: 'stretch',
      minHeight: 30,
      maxHeight: 150,
      padding: spacing.xs,
      borderWidth: StyleSheet.hairlineWidth,
      backgroundColor: colors.primary,
    },
  });

export const ReviewModal = ({ visible, onClose, onSubmit, isUpdate, initialData }) => {
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState('');
  const [formError, setFormError] = useState('');
  const [date, setDate] = useState(new Date());
  const { colors } = useTheme();
  const styles = createStyles({ colors });

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating);
      setTitle(initialData.title);
      setDate(moment(initialData.visitedDate).toDate());
    }
  }, [initialData]);

  const addReviewPressed = () => {
    setFormError('');

    if (!title) {
      setFormError(strings.review.titleValidation);
      return;
    }
    onSubmit({ title, rating, visitedDate: date });
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.listContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Ionicon
                color={colors.text}
                name="ios-close-sharp"
                onPress={onClose}
                size={30}
                style={styles.closeButton}
              />
              <TextLabel text={strings.review.reviewTitle} style={styles.titleHeader} />
              <StarRating rating={rating} setRating={setRating} />
              <Spacer />
              <TextInput
                autoFocus
                multiline
                placeholder={strings.review.enterText}
                placeholderTextColor={colors.placeholderText}
                style={styles.descriptionField}
                value={title}
                onChangeText={setTitle}
                maxLength={500}
              />
              <Spacer />
              <TextLabel text={strings.review.dateOfVisit} style={styles.visitLabel} />
              <DatePicker
                date={date}
                onDateChange={setDate}
                mode="date"
                maximumDate={new Date()}
                textColor={colors.text}
              />
              <Spacer />
              <ErrorView errors={[formError]} />
              {formError ? <Spacer /> : <></>}
              <Button
                title={isUpdate ? strings.review.updateReview : strings.review.addReview}
                onPress={addReviewPressed}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
};

ReviewModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  initialData: PropTypes.object,
};
