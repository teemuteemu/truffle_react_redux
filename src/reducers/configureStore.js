import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import web3Store from './modules/web3'
import SimpleStorageStore, { eventListener as simpleStorageEventListener } from './modules/SimpleStorage'

const rootReducer = (web3, contracts) => {
  return combineReducers({
    web3: web3Store(web3),
    SimpleStorage: SimpleStorageStore(contracts.SimpleStorage),
  });
};

const middleware = applyMiddleware(thunk);

export default (web3, contracts) => {
  const store = createStore(rootReducer(web3, contracts), middleware);

  simpleStorageEventListener(store.dispatch, store.getState);

  return store;
}
