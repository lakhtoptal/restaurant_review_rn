import { StyleSheet } from 'react-native';

export const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      flex: 1,
    },
    listContainer: {
      flexGrow: 1,
    },
  });
