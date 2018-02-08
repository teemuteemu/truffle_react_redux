import contract from 'truffle-contract'

import SimpleStorageContract from 'build/contracts/SimpleStorage.json'

const simpleStorage = contract(SimpleStorageContract)

const DEPLOY = 'SIMPLE_STORAGE/DEPLOY';
const GET = 'SIMPLE_STORAGE/GET';

const initialState = {
  instance: null,
  value: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET:
      return Object.assign({}, state, { value: action.value });
    case DEPLOY:
      return Object.assign({}, state, { instance: action.instance });
    default:
      return state;
  }
}

export function deploy(web3) {
  simpleStorage.setProvider(web3.currentProvider)

  return (dispatch) => {
    return simpleStorage.deployed()
      .then((instance) => {
        // Listen for SetValue events
        const events = instance.SetValue();
        events.watch((err, res) => {
          const value = res.args.value.c[0];
          dispatch({ type: GET, value });
        });

        dispatch({ type: DEPLOY, instance });

        return instance;
      });
  }
}

export function get() {
  return (dispatch, getState) => {
    const state = getState();

    state.web3.web3.eth.getAccounts((err, accounts) => {
      state.SimpleStorage.instance.get.call(accounts[0])
        .then((result) => {
          dispatch({ type: GET, value: result.c[0] });
        });;
    });
  }
}

export function set(value) {
  return (dispatch, getState) => {
    const state = getState();

    state.web3.web3.eth.getAccounts((err, accounts) => {
      state.SimpleStorage.instance.set(value, { from: accounts[0] });
    });
  }
}
