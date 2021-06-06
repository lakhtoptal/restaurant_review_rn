import { RestaurantController } from '@/controllers';

export const TYPES = {
  RESTAURANT: 'RESTAURANT',
  RESTAURANT_REQUEST: 'RESTAURANT_REQUEST',
  RESTAURANT_SUCCESS: 'RESTAURANT_SUCCESS',
  RESTAURANT_ERROR: 'RESTAURANT_ERROR',
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

export const getRestaurantList = () => async (dispatch) => {
  dispatch(getRestaurantRequest());
  try {
    const list = await RestaurantController.getAll();
    dispatch(getRestaurantSuccess(list));
  } catch (error) {
    dispatch(getRestaurantError(error.message));
  }
};
