import getWeb3 from 'utils/getWeb3'

const CONNECT = 'WEB3/CONNECT';
const DISCONNECT = 'WEB3/DISCONNECT';

const initialState = {
  web3: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT:
      return Object.assign({}, state, { web3: action.web3 });
    case DISCONNECT:
      return Object.assign({}, state, { web3: null });
    default:
      return state;
  }
}

export function connectWeb3(web3) {
  return (dispatch) => {
    return getWeb3
      .then(result => {
        if (result && result.web3) {
          dispatch({ type: CONNECT, web3: result.web3 });
          return result.web3;
        }

        dispatch({ type: DISCONNECT });
        return null;
      })
      .catch(err => console.error('Error finding web3.'));
  }
}
