import { getRestaurantList } from './RestaurantActions';
import { CommentController } from '@/controllers';

export const TYPES = {
  COMMENT_UPSERT: 'COMMENT_UPSERT',
  COMMENT_UPSERT_REQUEST: 'COMMENT_UPSERT_REQUEST',
  COMMENT_UPSERT_SUCCESS: 'COMMENT_UPSERT_SUCCESS',
  COMMENT_UPSERT_ERROR: 'COMMENT_UPSERT_ERROR',
};

const commentUpsertRequest = () => ({
  type: TYPES.COMMENT_UPSERT_REQUEST,
  payload: null,
});

const commentUpsertSuccess = () => ({
  type: TYPES.COMMENT_UPSERT_SUCCESS,
  payload: null,
});

const commentUpsertError = (error) => ({
  type: TYPES.COMMENT_UPSERT_ERROR,
  payload: { error },
});

export const upsertComment = (payload, isUpdate) => async (dispatch) => {
  dispatch(commentUpsertRequest());
  try {
    if (isUpdate) {
      await CommentController.update(payload);
    } else {
      await CommentController.create(payload);
    }
    dispatch(getRestaurantList());
    dispatch(commentUpsertSuccess());
    return true;
  } catch (error) {
    dispatch(commentUpsertError(error.message));
    return false;
  }
};
