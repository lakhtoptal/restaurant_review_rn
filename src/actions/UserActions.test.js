import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { logout, TYPES } from '@/actions/UserActions';

const logoutActions = [
  {
    type: TYPES.CLEAR_STORE,
    payload: null,
  },
];

describe('UserActions', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it('should create an action for logout', async () => {
    await store.dispatch(logout());
    const actions = store.getActions();
    expect(actions).toEqual(logoutActions);
  });
});
