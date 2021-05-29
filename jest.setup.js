import { NativeModules } from 'react-native';

NativeModules.ReactLocalization = {
  language: 'en',
};

global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  useSharedValue: jest.fn,
  useAnimatedStyle: jest.fn,
  withTiming: jest.fn,
  withSpring: jest.fn,
  withRepeat: jest.fn,
  withSequence: jest.fn,
  useAnimatedProps: jest.fn,
  Easing: {
    linear: jest.fn,
    elastic: jest.fn,
  },
}));

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
  show: jest.fn().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
