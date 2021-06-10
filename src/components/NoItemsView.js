import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextLabel } from '@/components';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 100,
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
