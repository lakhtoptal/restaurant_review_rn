import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#F8F9FA',
      secondary: '#29434E',
      error: '#D32F2F',
      text: '#212121',
      placeholderText: 'rgba(33, 33, 33, 0.4)',
      border: '#212121',
      activeTab: '#1976D2',
      inactiveTab: '#757575',
      background: '#fff',
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#212121',
      secondary: '#29434E',
      error: '#D32F2F',
      text: '#FFFFFF',
      placeholderText: 'rgba(255, 255, 255, 0.4)',
      border: '#FFFFFF',
      activeTab: '#4FC3F7',
      inactiveTab: '#FFFFFF',
      background: '#000',
    },
  },
};
