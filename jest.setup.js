import { NativeModules } from 'react-native';

NativeModules.ReactLocalization = {
  language: 'en',
};

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
  show: jest.fn().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
