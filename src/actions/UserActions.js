import { UserController } from '@/controllers';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
};

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginSuccess = (user) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const registerRequest = () => ({
  type: TYPES.REGISTER_REQUEST,
  payload: null,
});

const registerSuccess = (user) => ({
  type: TYPES.REGISTER_SUCCESS,
  payload: { user },
});

const registerError = (error) => ({
  type: TYPES.REGISTER_ERROR,
  payload: { error },
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await UserController.login(username, password);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const register = (payload) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const user = await UserController.register(payload);
    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await UserController.logout();
  } finally {
    dispatch(clearStore());
  }
};
