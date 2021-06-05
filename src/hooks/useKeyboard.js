import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = () => {
  const [duration, setDuration] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e) {
    setDuration(e.duration);
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const keyBaordDidShow = Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
    const keyBaordDidHide = Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
    return () => {
      keyBaordDidShow.remove();
      keyBaordDidHide.remove();
    };
  }, []);

  return { duration, keyboardHeight };
};
