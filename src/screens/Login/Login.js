import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login, TYPES } from '@/actions/UserActions';
import { Button, ErrorView, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Login/Login.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { shadow } from '@/theme';
import { NAVIGATION } from '@/constants';

export function Login() {
  const [formError, setFormError] = useState('');

  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((state) => errorsSelector([TYPES.LOGIN], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN], state));

  const handleSubmit = () => {
    setFormError('');
    const { authentication } = strings;
    if (!username) {
      setFormError(`${authentication.formError} ${authentication.username}`);
      return;
    }
    if (!password) {
      setFormError(`${authentication.formError} ${authentication.password}`);
      return;
    }
    dispatch(login(username, password));
  };

  const handleRegister = () => {
    navigation.navigate(NAVIGATION.register);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={[styles.formContainer, shadow.primary, { backgroundColor: colors.primary }]}>
            <TextField
              autoCapitalize="none"
              accessibilityHint={strings.authentication.usernameHint}
              accessibilityLabel={strings.authentication.username}
              onChangeText={setUsername}
              placeholder={strings.authentication.username}
              value={username}
            />
            <TextField
              secureTextEntry
              accessibilityHint={strings.authentication.passwordHint}
              accessibilityLabel={strings.authentication.password}
              autoCapitalize="none"
              onChangeText={setPassword}
              placeholder={strings.authentication.password}
              textContentType="password"
              value={password}
            />
            <ErrorView errors={[formError, ...errors]} />
            <Button
              disabled={isLoading}
              onPress={handleSubmit}
              style={styles.submitButton}
              title={isLoading ? strings.common.loading : strings.login.button}
            />
            <Button
              onPress={handleRegister}
              style={styles.submitButton}
              title={strings.login.newUser}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
