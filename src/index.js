import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import contract from 'truffle-contract'

import getWeb3 from 'utils/getWeb3'
import SimpleStorageContract from 'build/contracts/SimpleStorage.json'

const SimpleStorage = contract(SimpleStorageContract)
const contracts = {
  SimpleStorage,
};

import App from 'components/App/index'
import store from 'reducers/configureStore'

const root = document.getElementById('root');

ReactDOM.render(
  <div>connecting to web3...</div>,
  root
);

function setupWeb3Contracts() {
  return getWeb3()
    .then(web3 => {

      // Set web3 provider for each contract
      Object.keys(contracts)
        .forEach(contract => contracts[contract].setProvider(web3.currentProvider));

      // Deploy each contract and store in contracts object (not the nicest way)jj
      const deploys = Object.keys(contracts)
        .map(contract => {
          return contracts[contract].deployed()
            .then(instance => {
              contracts[contract] = instance;
              return Promise.resolve(instance);
            });
        });

      return Promise.all(deploys)
        .then(instances => {
          return {
            web3,
            contracts,
          }
        });
    });
}

setupWeb3Contracts()
  .then(({ web3, contracts }) => {
      ReactDOM.render(
        <Provider store={store(web3, contracts)}>
          <App />
        </Provider>,
        root
      );
    });
