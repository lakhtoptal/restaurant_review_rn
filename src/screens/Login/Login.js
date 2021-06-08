import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, TYPES } from '@/state/actions/AuthenticationActions';
import { Button, ErrorView, FormContainer, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Login/Login.styles';
import { errorsSelector } from '@/state/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/state/selectors/StatusSelectors';
import { NAVIGATION, checkLoginFormErrors } from '@/constants';

export const Login = () => {
  const [formError, setFormError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const errors = useSelector((state) => errorsSelector([TYPES.LOGIN], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN], state));

  const handleSubmit = () => {
    const error = checkLoginFormErrors({ username, password });
    setFormError('');
    if (error) {
      setFormError(error);
      return;
    }
    dispatch(login(username, password));
  };

  const handleRegister = () => {
    navigation.navigate(NAVIGATION.register);
  };

  return (
    <FormContainer>
      <TextField
        autoCapitalize="none"
        onChangeText={setUsername}
        placeholder={strings.authentication.username}
        value={username}
      />
      <TextField
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setPassword}
        placeholder={strings.authentication.password}
        textContentType="password"
        value={password}
      />
      <ErrorView errors={formError ? [formError] : errors} />
      <Button
        disabled={isLoading}
        onPress={handleSubmit}
        style={styles.submitButton}
        title={isLoading ? strings.common.loading : strings.login.button}
      />
      <Button onPress={handleRegister} style={styles.submitButton} title={strings.login.newUser} />
    </FormContainer>
  );
};
