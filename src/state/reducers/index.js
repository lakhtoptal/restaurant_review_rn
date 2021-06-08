import { combineReducers } from 'redux';
import { TYPES } from '../actions/AuthenticationActions';
import { errorReducer } from '@/state/reducers/ErrorReducer';
import { restaurantReducer } from '@/state/reducers/RestaurantReducer';
import { statusReducer } from '@/state/reducers/StatusReducer';
import { userReducer } from '@/state/reducers/UserReducer';

const appReducer = combineReducers({
  error: errorReducer,
  restaurant: restaurantReducer,
  status: statusReducer,
  user: userReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === TYPES.CLEAR_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};
