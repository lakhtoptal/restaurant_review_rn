import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, useColorScheme } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { register, TYPES } from '@/state/actions/UserActions';
import { Button, ErrorView, FormContainer, TextField } from '@/components';
import { strings } from '@/localization';
import { createStyles } from '@/screens/Register/Register.styles';
import { errorsSelector } from '@/state/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/state/selectors/StatusSelectors';
import { PlatformHelper } from '@/constants';

export const Register = () => {
  const [formError, setFormError] = useState('');

  const scheme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { formFields, rolePicker, apiPayload, checkFormErrors } = useRegisterForm();
  const styles = createStyles(useTheme());

  const errors = useSelector((state) => errorsSelector([TYPES.REGISTER], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.REGISTER], state));

  const handleSubmit = () => {
    setFormError('');
    const error = checkFormErrors();
    if (error) {
      setFormError(error);
      return;
    }
    dispatch(register(apiPayload));
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
      <Button
        onPress={navigation.goBack}
        style={styles.submitButton}
        title={strings.register.backToLogin}
      />
    </FormContainer>
  );
};
