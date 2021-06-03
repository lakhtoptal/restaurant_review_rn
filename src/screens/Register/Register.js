import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRegisterForm } from './hooks/useRegisterForm';
import { register, TYPES } from '@/actions/UserActions';
import { Button, ErrorView, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Register/Register.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { shadow } from '@/theme';
import PlatformHelper from '@/constants/platformHelper';

export function Register() {
  const [formError, setFormError] = useState('');

  const { colors } = useTheme();
  const scheme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { formFields, rolePicker, apiPayload, checkFormErrors } = useRegisterForm();

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

  const placeholderStyle = {
    color: colors.text,
    opacity: 0.7,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
        <View style={styles.container}>
          <View style={[styles.formContainer, shadow.primary, { backgroundColor: colors.primary }]}>
            {formFields.map((field, index) => (
              <TextField
                key={index}
                accessibilityHint={field.hint}
                accessibilityLabel={field.label}
                autoCapitalize="none"
                onChangeText={field.onChange}
                placeholder={field.label}
                secureTextEntry={field.secureTextEntry}
                textContentType={field.textContentType}
                value={field.value}
              />
            ))}
            <Text style={[styles.label, placeholderStyle]}>{rolePicker.placeholder}</Text>
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
            <ErrorView errors={[formError, ...errors]} />
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
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
