import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

export const ReviewModal = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const [formError, setFormError] = useState('');
  const { colors } = useTheme();
  const styles = createStyles({ colors });

  const addReviewClicked = () => {
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
              <Button title={strings.restaurant.addReview} onPress={addReviewClicked} />
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
};
