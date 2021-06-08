import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextLabel, Spacer } from '@/components';
import { shadow, spacing } from '@/theme';
import { strings } from '@/localization';

const createStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderRadius: spacing.s,
      margin: spacing.xs,
      minHeight: spacing.xl * 2,
      padding: spacing.xs,
      ...shadow.primary,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    textContainer: {
      flex: 1,
    },
    nameLabel: {
      fontSize: 18,
      fontWeight: '600',
    },
    descriptionSpacer: {
      marginTop: 0,
    },
    descriptionLabel: {
      maxHeight: 120,
    },
  });

export const UserView = ({ user, onEditUser, onDeleteUser }) => {
  const { firstName, lastName, role, username } = user;
  const { colors } = useTheme();
  const styles = createStyles({ colors });

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Spacer>
            <TextLabel text={`${firstName} ${lastName}`} style={styles.nameLabel} />
          </Spacer>
          <Spacer style={styles.descriptionSpacer}>
            <TextLabel
              text={`${strings.user.username}: ${username}`}
              style={styles.descriptionLabel}
            />
            <TextLabel text={`${strings.user.role}: ${role}`} style={styles.descriptionLabel} />
          </Spacer>
        </View>
        <Spacer>
          <Feather name="edit" size={24} color={colors.text} onPress={() => onEditUser(user)} />
        </Spacer>
        <Spacer>
          <AntDesign
            name="delete"
            size={24}
            color={colors.text}
            onPress={() => onDeleteUser(user)}
          />
        </Spacer>
      </View>
    </View>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onEditUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
};
