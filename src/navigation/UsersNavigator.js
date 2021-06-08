import React from 'react';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { NAVIGATION } from '@/constants';
import { Users, EditUser } from '@/screens';

const Stack = createNativeStackNavigator();

export const UsersNavigator = () => {
  const theme = useTheme();

  const detailOption = detailNavigationOptions(theme);

  return (
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION.users} component={Users} />
      <Stack.Screen name={NAVIGATION.editUser} component={EditUser} options={detailOption()} />
    </Stack.Navigator>
  );
};

export const detailNavigationOptions =
  (theme) =>
  (newOptions) =>
  ({ navigation }) => ({
    ...newOptions,
    headerLeft: () => (
      <Icon name="arrow-back" size={25} color={theme.colors.text} onPress={navigation.goBack} />
    ),
  });
