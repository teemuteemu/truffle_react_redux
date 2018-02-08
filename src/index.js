import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from 'components/App/index'
import store from 'reducers/configureStore'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
