import { createApi } from '@reduxjs/toolkit/query/react'
import type { RateComponentModel } from '../types'
import baseQuery from '../../../utils/baseQuery'

export const rateComponentService = createApi({
  reducerPath: 'rateComponentService',
  baseQuery,
  tagTypes: ['RateComponent'],
  endpoints: (builder) => ({
    getAllRateComponents: builder.query<RateComponentModel[], null>({
      query: () => `rate/component/all`,
      providesTags: ['RateComponent'],
    }),
    createRateComponent: builder.mutation<null, RateComponentModel>({
      query: (rateComponent) => ({
        url: 'rate/component/create',
        method: 'post',
        body: rateComponent,
      }),
      invalidatesTags: ['RateComponent'],
    }),
    removeRateComponent: builder.mutation<
      null,
      Partial<RateComponentModel> & Pick<RateComponentModel, 'id'>
    >({
      query: (rateComponent) => ({
        url: `rate/component/delete/${rateComponent.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['RateComponent'],
    }),
    updateRateComponent: builder.mutation<null, RateComponentModel>({
      query: (rateComponent) => ({
        url: `rate/component/update/${rateComponent.id}`,
        method: 'put',
        body: rateComponent,
      }),
      invalidatesTags: ['RateComponent'],
    }),
  }),
})

export const {
  useGetAllRateComponentsQuery,
  useCreateRateComponentMutation,
  useUpdateRateComponentMutation,
  useRemoveRateComponentMutation,
} = rateComponentService
