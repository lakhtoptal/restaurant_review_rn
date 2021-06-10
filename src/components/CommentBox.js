import React, { useRef, useState } from 'react';
import { Animated, Keyboard, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { strings } from '@/localization';
import { shadow, spacing } from '@/theme';
import { useKeyboard } from '@/hooks';
import { PlatformHelper } from '@/constants';

const createStyles = (colors) =>
  StyleSheet.create({
    replyContainer: {
      alignItems: 'flex-end',
      backgroundColor: colors.background,
      position: 'absolute',
      flexDirection: 'row',
      paddingBottom: spacing.xs,
      width: PlatformHelper.windowWidth,
      ...shadow.top,
    },
    replyField: {
      color: colors.text,
      borderWidth: StyleSheet.hairlineWidth,
      backgroundColor: colors.primary,
      flexShrink: 1,
      flex: 1,
      maxHeight: 200,
      borderRadius: spacing.s,
      padding: spacing.xs,
      margin: spacing.xs,
      marginBottom: spacing.xs / 2,
    },
    cancelButton: {
      marginLeft: spacing.xs,
    },
    cancelText: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '600',
      alignSelf: 'flex-end',
    },
  });

export const CommentBox = ({ value, onCancel, onSubmit }) => {
  const [message, setMessage] = useState(value);
  const { duration, keyboardHeight } = useKeyboard();
  const tabBarHeight = useBottomTabBarHeight();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const yAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(yAnim, {
      toValue: Math.max(keyboardHeight - tabBarHeight, 0),
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [keyboardHeight, tabBarHeight, yAnim, duration]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Animated.View style={[styles.replyContainer, { bottom: yAnim }]}>
      <TextInput
        autoFocus
        autoCapitalize="none"
        multiline
        placeholder={strings.commentBox.writeComment}
        placeholderTextColor={colors.placeholderText}
        style={styles.replyField}
        value={message}
        onChangeText={setMessage}
        maxLength={500}
      />
      <Ionicon.Button
        name="ios-send"
        size={20}
        onPress={() => {
          dismissKeyboard();
          onSubmit && onSubmit(message);
        }}
        color={colors.activeTab}
        backgroundColor={colors.background}
      />
      <Ionicon.Button
        name="ios-close-sharp"
        size={20}
        onPress={() => {
          dismissKeyboard();
          onCancel && onCancel();
        }}
        color={colors.text}
        backgroundColor={colors.background}
      />
    </Animated.View>
  );
};

CommentBox.propTypes = {
  value: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};
