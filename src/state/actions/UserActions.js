import { UserController } from '@/controllers';

export const TYPES = {
  USER: 'USER',
  USER_REQUEST: 'USER_REQUEST',
  USER_SUCCESS: 'USER_SUCCESS',
  USER_ERROR: 'USER_ERROR',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
};

const getUserRequest = () => ({
  type: TYPES.USER_REQUEST,
  payload: null,
});

const getUserSuccess = (list) => ({
  type: TYPES.USER_SUCCESS,
  payload: { list },
});

const getUserError = (error) => ({
  type: TYPES.USER_ERROR,
  payload: { error },
});

const updateUserRequest = () => ({
  type: TYPES.UPDATE_USER_REQUEST,
  payload: null,
});

const updateUserSuccess = () => ({
  type: TYPES.UPDATE_USER_SUCCESS,
  payload: null,
});

const updateUserError = (error) => ({
  type: TYPES.UPDATE_USER_ERROR,
  payload: { error },
});

export const getUserList = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const list = await UserController.getAll();
    dispatch(getUserSuccess(list));
  } catch (error) {
    dispatch(getUserError(error.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(updateUserRequest());
  try {
    await UserController.update(payload);
    dispatch(getUserList());
    dispatch(updateUserSuccess());
    return true;
  } catch (error) {
    dispatch(updateUserError(error.message));
    return false;
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await UserController.delete(id);
    dispatch(getUserList());
    return true;
  } catch (error) {
    return false;
  }
};
