import { createApi } from '@reduxjs/toolkit/query/react'
import type { LabelModel } from './LabelModel'
import baseQuery from '../../utils/baseQuery'

export const labelApi = createApi({
  reducerPath: 'labelApi',
  baseQuery,
  tagTypes: ['Label'],
  endpoints: (builder) => ({
    getAllLabels: builder.query<LabelModel[], null>({
      query: () => `label/all`,
      providesTags: ['Label'],
    }),
    createLabel: builder.mutation<null, LabelModel>({
      query: (label) => ({
        url: 'label/add',
        method: 'post',
        body: label,
      }),
      invalidatesTags: ['Label'],
    }),
    removeLabel: builder.mutation<
      null,
      Partial<LabelModel> & Pick<LabelModel, 'id'>
    >({
      query: (label) => ({
        url: `label/delete/${label.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Label'],
    }),
    updateLabel: builder.mutation<
      null,
      Partial<LabelModel> & Pick<LabelModel, 'id'>
    >({
      query: (label) => ({
        url: `label/update/`,
        method: 'put',
        body: label,
      }),
      invalidatesTags: ['Label'],
    }),
  }),
})

export const {
  useGetAllLabelsQuery,
  useCreateLabelMutation,
  useUpdateLabelMutation,
  useRemoveLabelMutation,
} = labelApi
