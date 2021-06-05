import { combineReducers } from 'redux';
import { errorReducer } from '@/state/reducers/ErrorReducer';
import { statusReducer } from '@/state/reducers/StatusReducer';
import { userReducer } from '@/state/reducers/UserReducer';

export const rootReducer = combineReducers({
  error: errorReducer,
  status: statusReducer,
  user: userReducer,
});
