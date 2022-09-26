import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import axios from 'axios'
import store from './store'
import 'reseter.css'
import './index.css'

import App from './App'
import { API_URL } from './constants'

axios.defaults.baseURL = API_URL

ReactDOM.render(
  // @ts-ignore
  <Provider store={store}>
    {/* @ts-ignore */}
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
)
