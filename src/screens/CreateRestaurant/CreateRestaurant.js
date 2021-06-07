import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { upsertRestaurant, TYPES } from '@/state/actions/RestaurantActions';
import { Button, ErrorView, FormContainer, TextField } from '@/components';
import { checkRestaurantFormErrors, NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { createStyles } from '@/screens/CreateRestaurant/CreateRestaurant.styles';
import { errorsSelector } from '@/state/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/state/selectors/StatusSelectors';

export const CreateRestaurant = () => {
  const params = useRoute().params;

  const [formError, setFormError] = useState('');
  const [restaurantName, setRestaurantName] = useState(params && params.data.name);
  const [restaurantDescription, setRestaurantDescription] = useState(
    params && params.data.description
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const errors = useSelector(
    (state) => errorsSelector([TYPES.RESTAURANT_UPSERT], state),
    shallowEqual
  );
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.RESTAURANT_UPSERT], state));
  const styles = createStyles(useTheme());
  const isUpdate = params && params.data;

  const handleSubmit = () => {
    setFormError('');
    const error = checkRestaurantFormErrors({
      restaurantName,
      restaurantDescription,
    });
    if (error) {
      setFormError(error);
      return;
    }

    const payload = {
      id: params && params.data.id,
      name: restaurantName,
      description: restaurantDescription,
    };

    dispatch(upsertRestaurant(payload, isUpdate)).then((success) => {
      if (success) {
        navigation.navigate(NAVIGATION.restaurants);
      }
    });
  };

  return (
    <FormContainer containerStyle={styles.container}>
      <TextField
        autoCapitalize="none"
        onChangeText={setRestaurantName}
        placeholder={strings.createRestaurant.name}
        value={restaurantName}
      />
      <TextField
        onChangeText={setRestaurantDescription}
        placeholder={strings.createRestaurant.description}
        value={restaurantDescription}
        multiline
        maxLength={500}
        style={styles.descriptionField}
      />
      <ErrorView errors={formError ? [formError] : errors} />
      <Button
        disabled={isLoading}
        onPress={handleSubmit}
        style={styles.submitButton}
        title={
          isLoading
            ? strings.common.loading
            : strings.createRestaurant[isUpdate ? 'update' : 'create']
        }
      />
    </FormContainer>
  );
};

export const navigationOptions = ({ route }) => ({
  title: route.params ? strings.createRestaurant.update : strings.createRestaurant.create,
});
