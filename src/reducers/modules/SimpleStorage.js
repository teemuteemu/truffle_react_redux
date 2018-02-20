const GET = 'SIMPLE_STORAGE/GET';

const initialState = (instance) => ({
  instance,
  value: 0,
});

export default (instance) => {
  return function reducer(state = initialState(instance), action) {
    switch (action.type) {
      case GET:
        return Object.assign({}, state, { value: action.value });
      default:
        return state;
    }
  }
}

export function get() {
  return (dispatch, getState) => {
    const { web3, SimpleStorage } = getState();

    web3.eth.getAccounts((err, accounts) => {
      SimpleStorage.instance.get.call(accounts[0])
        .then((result) => {
          dispatch({ type: GET, value: result.c[0] });
        });;
    });
  }
}

export function set(value) {
  return (dispatch, getState) => {
    const { web3, SimpleStorage} = getState();

    web3.eth.getAccounts((err, accounts) => {
      SimpleStorage.instance.set(value, { from: accounts[0] });
    });
  }
}

export function eventListener(dispatch, getState) {
  const { SimpleStorage } = getState();
  const events = SimpleStorage.instance.SetValue();

  events.watch((err, res) => get()(dispatch, getState));
}

