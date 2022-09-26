import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  roleApi,
  userApi,
  companyApi,
  labelApi,
  hospitalApi,
  departmentApi,
} from './services'
import { comboRateService, rateComponentService } from './modules/Rate/services'
import { applicationApi } from './modules/Application/applicationService'

export const store = configureStore({
  reducer: {
    form: formReducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
    [hospitalApi.reducerPath]: hospitalApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [comboRateService.reducerPath]: comboRateService.reducer,
    [rateComponentService.reducerPath]: rateComponentService.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roleApi.middleware,
      labelApi.middleware,
      hospitalApi.middleware,
      departmentApi.middleware,
      companyApi.middleware,
      userApi.middleware,
      comboRateService.middleware,
      rateComponentService.middleware,
      applicationApi.middleware
    ),
})

setupListeners(store.dispatch)

export default store
