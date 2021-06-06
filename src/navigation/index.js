import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { getUser } from '@/state/selectors/UserSelectors';
import { theme } from '@/theme';
import { HttpClient } from '@/controllers';

export function RootNavigator() {
  const user = useSelector(getUser);
  const scheme = useColorScheme();

  useEffect(() => {
    if (user) {
      HttpClient.setAuthorization(user.token);
    } else {
      HttpClient.clearAuthorization();
    }
  }, [user]);

  return (
    <NavigationContainer theme={theme[scheme]}>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
