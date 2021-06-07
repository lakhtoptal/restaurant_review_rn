import { getRestaurantList } from './RestaurantActions';
import { ReviewController } from '@/controllers';

export const TYPES = {
  REVIEW_UPSERT: 'REVIEW_UPSERT',
  REVIEW_UPSERT_REQUEST: 'REVIEW_UPSERT_REQUEST',
  REVIEW_UPSERT_SUCCESS: 'REVIEW_UPSERT_SUCCESS',
  REVIEW_UPSERT_ERROR: 'REVIEW_UPSERT_ERROR',
};

const reviewUpsertRequest = () => ({
  type: TYPES.REVIEW_UPSERT_REQUEST,
  payload: null,
});

const reviewUpsertSuccess = () => ({
  type: TYPES.REVIEW_UPSERT_SUCCESS,
  payload: null,
});

const reviewUpsertError = (error) => ({
  type: TYPES.REVIEW_UPSERT_ERROR,
  payload: { error },
});

export const upsertReview = (payload, isUpdate) => async (dispatch) => {
  dispatch(reviewUpsertRequest());
  try {
    if (isUpdate) {
      await ReviewController.update(payload);
    } else {
      await ReviewController.create(payload);
    }
    dispatch(getRestaurantList());
    dispatch(reviewUpsertSuccess());
    return true;
  } catch (error) {
    dispatch(reviewUpsertError(error.message));
    return false;
  }
};
