import { StyleSheet } from 'react-native';
import { shadow, spacing } from '@/theme';

export const createStyles = (theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderRadius: spacing.s,
      margin: spacing.s,
      marginBottom: 0,
      minHeight: spacing.xl * 2,
      ...shadow.primary,
    },
    textContainer: {
      margin: spacing.xs,
    },
    nameLabel: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    descriptionLabel: {
      marginBottom: spacing.xs,
    },
  });
};
