import { StyleSheet } from 'react-native';
import { shadow, spacing } from '@/theme';

export const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    listContainer: {
      flexGrow: 1,
    },
    infoContainer: {
      justifyContent: 'center',
      backgroundColor: colors.background,
      minHeight: spacing.xl * 2,
      padding: spacing.s,
      ...shadow.primary,
    },
    nameLabel: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    reviewsLabel: {
      fontSize: 17,
      fontWeight: 'bold',
      marginTop: spacing.m,
    },
  });
