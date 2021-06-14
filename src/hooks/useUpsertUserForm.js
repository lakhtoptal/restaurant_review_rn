import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { strings } from '@/localization';
import { checkUserFormErrors } from '@/constants';
import { findUser } from '@/state/selectors/UserSelectors';

export const useUpsertUserForm = (isUpdate) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  const params = useRoute().params;
  const user = useSelector(findUser(params ? params.user.id : ''));

  const { authentication } = strings;

  useEffect(() => {
    if (user && isUpdate) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUsername(user.username);
      setUserRole(user.role);
    }
  }, [user, isUpdate]);

  // Customized form fields array to render in text fields.
  const formFields = [
    {
      value: firstName,
      onChange: setFirstName,
      label: authentication.firstName,
    },
    {
      value: lastName,
      onChange: setLastName,
      label: authentication.lastName,
    },
    {
      value: username,
      onChange: setUsername,
      label: authentication.username,
    },
    {
      value: password,
      onChange: setPassword,
      label: authentication.password,
      secureTextEntry: true,
      textContentType: 'password',
    },
  ];

  const rolePicker = {
    open,
    setOpen,
    value: userRole,
    setValue: setUserRole,
    label: authentication.password,
    placeholder: authentication.selectRole,
    items: [
      { label: authentication.userRoles.user, value: 'user' },
      { label: authentication.userRoles.owner, value: 'owner' },
    ],
  };

  // Make sure keys should be same as used in backend api.
  let apiPayload = { ...user, firstName, lastName, username, password, role: userRole };
  if (isUpdate && !password) {
    apiPayload = _.omit(apiPayload, 'password');
  }

  const checkFormErrors = () =>
    checkUserFormErrors(
      {
        firstName,
        lastName,
        username,
        password,
        userRole,
      },
      isUpdate
    );

  return { formFields, rolePicker, apiPayload, checkFormErrors };
};
