import { connect } from 'react-redux'

import App from './App'
import { get, set } from 'reducers/modules/SimpleStorage'

const mapStateToProps = (state) => {
  return {
    web3: state.web3.web3,
    simpleStorageInstance: state.SimpleStorage.instance,
    value: state.SimpleStorage.value,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(get()),
    set: (value) => dispatch(set(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
