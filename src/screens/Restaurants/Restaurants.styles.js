import { StyleSheet } from 'react-native';

export const createStyles = (theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      flex: 1,
    },
  });
};
