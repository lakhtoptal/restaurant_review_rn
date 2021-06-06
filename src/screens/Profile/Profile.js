import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/state/actions/UserActions';
import { Button } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Profile/Profile.styles';
import { typography } from '@/theme';
import { getUser } from '@/state/selectors/UserSelectors';

export function Profile() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.title, { color: colors.text }]}>{user.username}</Text>
      <Text style={[typography.title, styles.title, { color: colors.text }]}>
        {`${user.firstName} ${user.lastName}`}
      </Text>
      <Text style={[typography.title, styles.title, { color: colors.text }]}>
        {`Role: ${user.role}`}
      </Text>
      <Button title={strings.profile.logout} onPress={logoutUser} style={styles.button} />
    </View>
  );
}
