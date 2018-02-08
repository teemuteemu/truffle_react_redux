import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import web3 from './modules/web3'
import SimpleStorage from './modules/SimpleStorage'

const rootReducer = combineReducers({
  web3,
  SimpleStorage,
});

const middleware = applyMiddleware(thunk);

export default createStore(rootReducer, middleware);
