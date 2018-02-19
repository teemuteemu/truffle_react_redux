import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import web3Store from './modules/web3'
import SimpleStorage from './modules/SimpleStorage'

const rootReducer = (web3, contracts) => {
  return combineReducers({
    web3: web3Store(web3),
    SimpleStorage: SimpleStorage(contracts.SimpleStorage),
  });
};

const middleware = applyMiddleware(thunk);

export default (web3, contracts) => createStore(rootReducer(web3, contracts), middleware);
