import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import axios from 'axios'
import store from './store'
import 'reseter.css'
import './index.css'

import App from './App'
import { API_URL } from './constants'

import './i18n'
import 'moment/locale/ru'
import 'moment/locale/en-gb'

axios.defaults.baseURL = API_URL

ReactDOM.render(
  // @ts-ignore
  <Provider store={store}>
    {/* @ts-ignore */}
    <SnackbarProvider maxSnack={3}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
)
