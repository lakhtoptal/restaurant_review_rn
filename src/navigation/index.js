import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import { getUserSelector } from '@/state/selectors/UserSelectors';
import { theme } from '@/theme';

export function RootNavigator() {
  const user = useSelector(getUserSelector);
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={theme[scheme]}>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
