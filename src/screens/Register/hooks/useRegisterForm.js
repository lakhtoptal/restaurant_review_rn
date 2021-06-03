import { useState } from 'react';
import { validateRegisterForm } from '../constants';
import { strings } from '@/localization';

export const useRegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  const { authentication } = strings;

  // Customized form fields array to render in text fields.
  const formFields = [
    {
      value: firstName,
      onChange: setFirstName,
      label: authentication.firstName,
      hint: authentication.firstNameHint,
    },
    {
      value: lastName,
      onChange: setLastName,
      label: authentication.lastName,
      hint: authentication.lastNameHint,
    },
    {
      value: username,
      onChange: setUsername,
      label: authentication.username,
      hint: authentication.usernameHint,
    },
    {
      value: password,
      onChange: setPassword,
      label: authentication.password,
      hint: authentication.passwordHint,
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
      { label: authentication.userRoles.admin, value: 'admin' },
    ],
  };

  // Make sure keys should be same as used in backend api.
  const apiPayload = { firstName, lastName, username, password, role: userRole };

  const checkFormErrors = () =>
    validateRegisterForm({
      firstName,
      lastName,
      username,
      password,
      userRole,
    });

  return { formFields, rolePicker, apiPayload, checkFormErrors };
};
