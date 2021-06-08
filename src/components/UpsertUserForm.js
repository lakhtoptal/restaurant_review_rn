import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUpsertUserForm } from '@/hooks';
import { register, TYPES } from '@/state/actions/AuthenticationActions';
import { updateUser, TYPES as USER_TYPES } from '@/state/actions/UserActions';
import { Button, ErrorView, FormContainer, TextField } from '@/components';
import { strings } from '@/localization';
import { errorsSelector } from '@/state/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/state/selectors/StatusSelectors';
import { PlatformHelper } from '@/constants';
import { spacing } from '@/theme';

const createStyles = ({ colors }) =>
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

export const UpsertUserForm = ({ isUpdate }) => {
  const [formError, setFormError] = useState('');

  const scheme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { formFields, rolePicker, apiPayload, checkFormErrors } = useUpsertUserForm(isUpdate);
  const styles = createStyles(useTheme());

  const errors = useSelector(
    (state) => errorsSelector([isUpdate ? USER_TYPES.UPDATE_USER : TYPES.REGISTER], state),
    shallowEqual
  );
  const isLoading = useSelector((state) =>
    isLoadingSelector([isUpdate ? USER_TYPES.UPDATE_USER : TYPES.REGISTER], state)
  );

  const handleSubmit = () => {
    setFormError('');
    const error = checkFormErrors();
    if (error) {
      setFormError(error);
      return;
    }
    if (isUpdate) {
      dispatch(updateUser(apiPayload)).then((success) => success && navigation.goBack());
    } else {
      dispatch(register(apiPayload));
    }
  };

  return (
    <FormContainer>
      {formFields.map((field, index) => (
        <TextField
          key={index}
          autoCapitalize="none"
          onChangeText={field.onChange}
          placeholder={field.label}
          secureTextEntry={field.secureTextEntry}
          textContentType={field.textContentType}
          value={field.value}
        />
      ))}
      <Text style={styles.label}>{rolePicker.placeholder}</Text>
      <DropDownPicker
        open={rolePicker.open}
        value={rolePicker.value}
        items={rolePicker.items}
        listMode={PlatformHelper.isAndroid ? 'MODAL' : 'SCROLLVIEW'}
        setOpen={rolePicker.setOpen}
        setValue={rolePicker.setValue}
        style={styles.dropDownPicker}
        theme={scheme === 'light' ? 'LIGHT' : 'DARK'}
      />
      <ErrorView errors={formError ? [formError] : errors} />
      <Button
        disabled={isLoading}
        onPress={handleSubmit}
        style={styles.submitButton}
        title={isLoading ? strings.common.loading : strings.register.button}
      />
      {!isUpdate && (
        <Button
          onPress={navigation.goBack}
          style={styles.submitButton}
          title={strings.register.backToLogin}
        />
      )}
    </FormContainer>
  );
};

UpsertUserForm.propTypes = {
  isUpdate: PropTypes.bool,
};