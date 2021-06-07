import { StyleSheet } from 'react-native';
import { spacing } from '@/theme';

export const createStyles = ({ colors }) =>
  StyleSheet.create({
    submitButton: {
      marginTop: spacing.m,
    },
    label: {
      left: spacing.xs,
      marginBottom: spacing.xs,
      color: colors.text,
      opacity: 0.7,
    },
    dropDownPicker: {
      height: 40,
      borderWidth: 0,
      marginBottom: spacing.m,
    },
  });
