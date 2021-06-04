import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextLabel } from './TextLabel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export const NoItemsView = ({ text }) => (
  <View style={styles.container}>
    <TextLabel style={styles.label} text={text} />
  </View>
);

NoItemsView.propTypes = {
  text: PropTypes.string,
};
