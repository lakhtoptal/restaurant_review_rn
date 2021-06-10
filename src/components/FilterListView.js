import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextLabel } from '@/components';
import { spacing } from '@/theme';
import { strings } from '@/localization';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    modalContainer: {
      marginTop: 'auto',
      justifyContent: 'flex-end',
      backgroundColor: colors.background,
    },
    backTouch: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    closeButton: {
      position: 'absolute',
      right: spacing.s,
      top: spacing.s,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: spacing.s,
    },
    filterButton: (selected) => ({
      backgroundColor: selected ? colors.secondary : 'transparent',
      padding: spacing.s,
      borderBottomColor: spacing.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
    }),
    textLabel: (selected) => ({
      color: selected ? colors.background : colors.text,
    }),
  });

export const FilterListView = ({ filters, selectedFilters, visible, onClose, onFilterPress }) => {
  const { colors } = useTheme();
  const styles = createStyles({ colors });

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backTouch} />
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.modalContainer} onPress={onClose}>
        <TextLabel text={strings.restaurant.filter.title} style={styles.headerTitle} />
        <AntDesign
          name="close"
          size={24}
          color={colors.text}
          onPress={onClose}
          style={styles.closeButton}
        />
        {(filters ? filters : []).map((filter, index) => {
          const selected = selectedFilters.includes(filter.value);
          return (
            <TouchableOpacity
              key={index}
              style={styles.filterButton(selected)}
              onPress={() => onFilterPress && onFilterPress(filter.value)}
            >
              <TextLabel text={filter.title} style={styles.textLabel(selected)} />
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    </Modal>
  );
};

FilterListView.propTypes = {
  filters: PropTypes.array,
  selectedFilters: PropTypes.array,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onFilterPress: PropTypes.func,
};
