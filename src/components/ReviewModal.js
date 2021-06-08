import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TextLabel } from './TextLabel';
import { Button } from './Button';
import { RatingInput } from './RatingInput';
import { ErrorView } from './ErrorView';
import { Spacer } from './Spacer';
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
    descriptionField: {
      alignSelf: 'stretch',
      minHeight: 30,
      maxHeight: 150,
      padding: spacing.xs,
      borderWidth: StyleSheet.hairlineWidth,
      backgroundColor: colors.primary,
    },
  });

export const ReviewModal = ({
  visible,
  onClose,
  onSubmit,
  isUpdate,
  initialText,
  initialRating,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [text, setText] = useState(initialText);
  const [formError, setFormError] = useState('');
  const { colors } = useTheme();
  const styles = createStyles({ colors });

  useEffect(() => setRating(initialRating), [initialRating]);
  useEffect(() => setText(initialText), [initialText]);

  const addReviewPressed = () => {
    setFormError('');

    if (!text) {
      setFormError(strings.restaurant.textValidation);
      return;
    }
    onSubmit(text, rating);
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
              <TextLabel text={strings.restaurant.reviewTitle} style={styles.titleHeader} />
              <RatingInput rating={rating} setRating={setRating} />
              <Spacer />
              <TextInput
                autoFocus
                autoCapitalize="none"
                multiline
                placeholder={strings.restaurant.enterText}
                placeholderTextColor={colors.placeholderText}
                style={styles.descriptionField}
                value={text}
                onChangeText={setText}
                maxLength={500}
              />
              <Spacer />
              <ErrorView errors={[formError]} />
              {formError ? <Spacer /> : <></>}
              <Button
                title={isUpdate ? strings.restaurant.updateReview : strings.restaurant.addReview}
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
  initialRating: PropTypes.number.isRequired,
  initialText: PropTypes.string.isRequired,
};
