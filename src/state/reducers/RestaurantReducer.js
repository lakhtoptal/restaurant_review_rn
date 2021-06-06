import { TYPES } from '@/state/actions/RestaurantActions';

const initialState = {
  list: [],
};

export const restaurantReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case TYPES.RESTAURANT_SUCCESS:
      return { ...state, list: payload.list };
    case TYPES.RESTAURANT_ERROR:
      return { ...state, list: [] };
    default:
      return state;
  }
};
