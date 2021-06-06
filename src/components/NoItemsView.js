import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextLabel } from './TextLabel';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: (error) => ({
      textAlign: 'center',
      color: error ? colors.error : colors.text,
      fontSize: 25,
      fontWeight: 'bold',
    }),
  });

export const NoItemsView = ({ text, isError }) => {
  const styles = createStyles(useTheme());

  return (
    <View style={styles.container}>
      <TextLabel style={styles.label(isError)} text={text} />
    </View>
  );
};

NoItemsView.propTypes = {
  text: PropTypes.string,
  isError: PropTypes.bool,
};
