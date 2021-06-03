import { render } from '@testing-library/react-native';
import React from 'react';
import { strings } from '@/localization';
import { Profile } from '@/screens/Profile/Profile';
import { withProviders } from '@/test-utils';

describe('Profile', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(withProviders(<Profile />));

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the title and logout button', async () => {
    const { getByText } = render(withProviders(<Profile />));

    const profileTitle = getByText(strings.profile.message);
    const logoutButton = getByText(strings.profile.logout);

    expect(profileTitle).toBeTruthy();
    expect(logoutButton).toBeTruthy();
  });
});
