import { Dimensions, Platform } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const PlatformHelper = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  windowWidth,
  windowHeight,
};

export default PlatformHelper;
