import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { getWeb3 } from 'utils/web3'
import { deployContracts } from 'utils/contracts'

import App from 'components/App/index'
import contracts from './contracts'
import configureStore from 'store'

const root = document.getElementById('root');

ReactDOM.render(
  <div>connecting to web3...</div>,
  root
);

getWeb3()
  .then(web3 => deployContracts(web3, contracts))
  .then(configureStore)
  .then(store => {
      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        root
      );
    });
