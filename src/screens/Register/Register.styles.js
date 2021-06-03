import { StyleSheet } from 'react-native';
import { spacing } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.m,
    marginTop: 20,
  },
  formContainer: {
    borderRadius: 5,
    padding: spacing.s,
    width: '100%',
  },
  submitButton: {
    marginTop: spacing.m,
  },
  label: {
    left: spacing.xs,
    marginBottom: spacing.xs,
  },
  dropDownPicker: {
    height: 40,
    borderWidth: 0,
    marginBottom: spacing.m,
  },
});
