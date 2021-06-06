import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { createStyles } from '@/screens/CreateRestaurant/CreateRestaurant.styles';
import { TextField } from '@/components';
import { strings } from '@/localization';

export const CreateRestaurant = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { colors } = useTheme();

  const styles = createStyles({ colors });
  const { createRestaurant } = strings;
  return (
    <View style={styles.container}>
      <TextField
        accessibilityHint={createRestaurant.nameHint}
        accessibilityLabel={createRestaurant.name}
        autoCapitalize="none"
        onChangeText={setName}
        placeholder={createRestaurant.name}
        value={name}
      />
      <TextField
        accessibilityHint={createRestaurant.descriptionHint}
        accessibilityLabel={createRestaurant.description}
        onChangeText={setDescription}
        placeholder={createRestaurant.description}
        value={description}
      />
    </View>
  );
};
