import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { rootReducer } from '@/state/reducers';
import { storage } from '@/state/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['error', 'status'],
};

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
