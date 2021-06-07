import { strings } from '@/localization';

const validateFieldLength = (text, min = 2, max = 50) => {
  return text && text.length >= min && text.length < max;
};

export const checkRestaurantFormErrors = (fields) => {
  const { createRestaurant } = strings;

  let emptyField = '';
  if (!fields.restaurantName) {
    emptyField = createRestaurant.name;
  } else if (!fields.restaurantDescription) {
    emptyField = createRestaurant.description;
  }

  if (emptyField) {
    return `${createRestaurant.formError} ${emptyField.toLowerCase()}`;
  }

  // Field Validations
  if (!validateFieldLength(fields.restaurantName)) {
    return createRestaurant.nameValidate;
  }

  return false;
};

export const checkLoginFormErrors = (fields) => {
  const { authentication } = strings;

  let emptyField = '';
  if (!fields.username) {
    emptyField = authentication.username;
  } else if (!fields.password) {
    emptyField = authentication.password;
  }

  if (emptyField) {
    return `${authentication.formError} ${emptyField.toLowerCase()}`;
  }

  return false;
};

export const checkRegisterFormErrors = (fields) => {
  const { authentication } = strings;

  let emptyField = '';
  if (!fields.firstName) {
    emptyField = authentication.firstName;
  } else if (!fields.lastName) {
    emptyField = authentication.lastName;
  } else if (!fields.username) {
    emptyField = authentication.username;
  } else if (!fields.password) {
    emptyField = authentication.password;
  }

  if (emptyField) {
    return `${authentication.formError} ${emptyField.toLowerCase()}`;
  }

  // Field Validations
  const { validations } = authentication;
  if (!validateFieldLength(fields.firstName)) {
    return validations.firstName;
  }
  if (!validateFieldLength(fields.lastName)) {
    return validations.lastName;
  }
  if (!validateFieldLength(fields.username)) {
    return validations.username;
  }
  if (!validateFieldLength(fields.password, 0, 100)) {
    return validations.longPassword;
  }
  if (!validateFieldLength(fields.password, 6, 100)) {
    return validations.shortPassword;
  }

  if (!fields.userRole) {
    return authentication.selectRole;
  }
  return false;
};
