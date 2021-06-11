import { StyleSheet } from 'react-native';
import { shadow, spacing, typography } from '@/theme';

export const createStyles = (colors) =>
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
    nameContainer: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
    },
    nameLabel: {
      ...typography.title,
      marginBottom: spacing.xs,
    },
    reviewsLabel: {
      ...typography.title,
      marginTop: spacing.m,
    },
    reviewButton: {
      margin: spacing.s,
    },
    headerContainer: {
      padding: spacing.s,
      backgroundColor: colors.secondary,
    },
    headerText: {
      ...typography.headerTitle,
      color: colors.background,
    },
  });
