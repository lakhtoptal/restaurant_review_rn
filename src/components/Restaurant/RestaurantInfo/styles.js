import { StyleSheet } from 'react-native';
import { shadow, spacing } from '@/theme';

export const createStyles = (theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: colors.background,
      minHeight: spacing.xl * 2,
      padding: spacing.xs,
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
};
