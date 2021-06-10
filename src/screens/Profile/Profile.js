import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/state/actions/AuthenticationActions';
import { Button, TextLabel } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Profile/Profile.styles';
import { typography } from '@/theme';
import { getUserSelector } from '@/state/selectors/UserSelectors';

export function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <TextLabel style={[typography.title, styles.title]} text={user.username} />
      <TextLabel
        style={[typography.title, styles.title]}
        text={`${user.firstName} ${user.lastName}`}
      />
      <TextLabel style={[typography.title, styles.title]} text={`Role: ${user.role}`} />
      <Button title={strings.profile.logout} onPress={logoutUser} style={styles.button} />
    </View>
  );
}
