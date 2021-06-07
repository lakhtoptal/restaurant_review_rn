import { RestaurantController } from '@/controllers';

export const TYPES = {
  RESTAURANT: 'RESTAURANT',
  RESTAURANT_REQUEST: 'RESTAURANT_REQUEST',
  RESTAURANT_SUCCESS: 'RESTAURANT_SUCCESS',
  RESTAURANT_ERROR: 'RESTAURANT_ERROR',
  RESTAURANT_UPSERT: 'RESTAURANT_UPSERT',
  RESTAURANT_UPSERT_REQUEST: 'RESTAURANT_UPSERT_REQUEST',
  RESTAURANT_UPSERT_SUCCESS: 'RESTAURANT_UPSERT_SUCCESS',
  RESTAURANT_UPSERT_ERROR: 'RESTAURANT_UPSERT_ERROR',
};

const getRestaurantRequest = () => ({
  type: TYPES.RESTAURANT_REQUEST,
  payload: null,
});

const getRestaurantSuccess = (list) => ({
  type: TYPES.RESTAURANT_SUCCESS,
  payload: { list },
});

const getRestaurantError = (error) => ({
  type: TYPES.RESTAURANT_ERROR,
  payload: { error },
});

const restaurantUpsertRequest = () => ({
  type: TYPES.RESTAURANT_UPSERT_REQUEST,
  payload: null,
});

const restaurantUpsertSuccess = () => ({
  type: TYPES.RESTAURANT_UPSERT_SUCCESS,
  payload: null,
});

const restaurantUpsertError = (error) => ({
  type: TYPES.RESTAURANT_UPSERT_ERROR,
  payload: { error },
});

export const getRestaurantList = () => async (dispatch) => {
  dispatch(getRestaurantRequest());
  try {
    const list = await RestaurantController.getAll();
    dispatch(getRestaurantSuccess(list));
  } catch (error) {
    dispatch(getRestaurantError(error.message));
  }
};

export const upsertRestaurant = (payload, isUpdate) => async (dispatch) => {
  dispatch(restaurantUpsertRequest());
  try {
    if (isUpdate) {
      await RestaurantController.update(payload);
    } else {
      await RestaurantController.create(payload);
    }
    dispatch(getRestaurantList());
    dispatch(restaurantUpsertSuccess());
    return true;
  } catch (error) {
    dispatch(restaurantUpsertError(error.message));
    return false;
  }
};
