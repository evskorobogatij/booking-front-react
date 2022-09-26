import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/baseQuery'
import { ApplicationModel } from './types'

export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery,
  tagTypes: ['Application'],
  endpoints: (builder) => ({
    getApplication: builder.query<ApplicationModel, null>({
      query: () => `application/get`,
      providesTags: ['Application'],
    }),
    updateApplication: builder.mutation<null, ApplicationModel>({
      query: (body) => ({
        url: `application/update/`,
        method: 'put',
        body,
      }),
      invalidatesTags: ['Application'],
    }),
  }),
})

export const {
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} = applicationApi
