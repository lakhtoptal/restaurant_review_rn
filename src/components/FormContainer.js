import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewPropTypes } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { shadow, spacing } from '@/theme';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    listContainer: {
      flexGrow: 1,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.m,
      flex: 1,
    },
    formContainer: {
      backgroundColor: colors.primary,
      borderRadius: 5,
      padding: spacing.s,
      width: '100%',
    },
  });

export const FormContainer = ({ children, containerStyle }) => {
  const { colors } = useTheme();
  const styles = createStyles({ colors });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={containerStyle || styles.listContainer}
        nestedScrollEnabled
      >
        <View style={styles.container}>
          <View style={[styles.formContainer, shadow.primary]}>{children}</View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

FormContainer.propTypes = {
  containerStyle: ViewPropTypes.style,
};
