import { StyleSheet } from 'react-native';
import { spacing } from '@/theme';

export const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.l,
    },
    submitButton: {
      marginTop: spacing.m,
    },
    descriptionField: {
      maxHeight: 200,
    },
  });
