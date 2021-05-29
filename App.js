/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { hide } from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    hide();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View>
        <Text>Restaurant Reviews</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
