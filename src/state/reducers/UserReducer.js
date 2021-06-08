import { TYPES } from '@/state/actions/AuthenticationActions';
import { TYPES as USER_TYPES } from '@/state/actions/UserActions';

const initialState = {
  loggedInUser: {},
  userList: {},
};

export const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
      return { ...state, loggedInUser: payload.user };
    case USER_TYPES.USER_SUCCESS:
      return { ...state, userList: payload.list };
    case TYPES.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};
