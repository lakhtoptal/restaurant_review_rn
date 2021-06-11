import React, { useEffect } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { createStyles } from '@/screens/Users/Users.styles';
import { NoItemsView, UserView } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { deleteUser, getUserList, TYPES } from '@/state/actions/UserActions';
import { getUserListSelector } from '@/state/selectors/UserSelectors';
import { isLoadingSelector } from '@/state/selectors/StatusSelectors';
import { errorsSelector } from '@/state/selectors/ErrorSelectors';

export const Users = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userList = useSelector(getUserListSelector);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.USER], state));
  const error = useSelector((state) => errorsSelector([TYPES.USER], state));

  const styles = createStyles(useTheme());

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const onEditUser = (user) => {
    navigation.navigate(NAVIGATION.editUser, { user });
  };

  const onDeleteUser = (user) => {
    const { alert } = strings.common;
    Alert.alert(alert.title, `${strings.user.deleteMessage} \n${user.username}`, [
      {
        text: alert.cancel,
        style: 'cancel',
      },
      {
        text: alert.delete,
        onPress: () => {
          dispatch(deleteUser(user.id));
        },
        style: 'destructive',
      },
    ]);
  };

  const onRefresh = () => dispatch(getUserList());
  const isError = error && error.length > 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <UserView user={item} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
        )}
        ListEmptyComponent={() => (
          <NoItemsView text={isError ? error[0] : strings.user.noUserFound} isError={isError} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
