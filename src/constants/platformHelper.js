import { Dimensions, Platform } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const PlatformHelper = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  windowWidth,
  windowHeight,
};
