import { connect } from 'react-redux'

import App from './App'
import { deploy, get, set } from 'reducers/modules/SimpleStorage'

const mapStateToProps = (state) => {
  return {
    web3: state.web3.web3,
    simpleStorageInstance: state.SimpleStorage.instance,
    value: state.SimpleStorage.value,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deploySimpleStorage: (web3) => dispatch(deploy(web3)),
    get: () => dispatch(get()),
    set: (value) => dispatch(set(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
