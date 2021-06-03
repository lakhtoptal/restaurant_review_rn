import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { Login } from '@/screens';
import { Register } from '@/screens/Register/Register';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name={NAVIGATION.login} options={{ headerShown: false }} />
      <Stack.Screen
        component={Register}
        name={NAVIGATION.register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
