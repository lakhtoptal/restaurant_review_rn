import React, { useRef, useState } from 'react';
import { Animated, Keyboard, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Spacer } from '@/components';
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
  });

export const CommentInputBox = ({ value, onCancel, onSubmit }) => {
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
      <Spacer>
        <Ionicon
          name="ios-send"
          size={25}
          onPress={() => {
            dismissKeyboard();
            onSubmit && onSubmit(message);
          }}
          color={colors.activeTab}
        />
      </Spacer>
      <Spacer>
        <Ionicon
          name="ios-close-sharp"
          size={25}
          onPress={() => {
            dismissKeyboard();
            onCancel && onCancel();
          }}
          color={colors.text}
        />
      </Spacer>
    </Animated.View>
  );
};

CommentInputBox.propTypes = {
  value: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};
