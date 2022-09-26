import { createApi } from '@reduxjs/toolkit/query/react'
import type { ComboRateModel } from '../types'
import baseQuery from '../../../utils/baseQuery'

const sortComponents = (
  components: ComboRateModel['components']
): ComboRateModel['components'] => {
  const res: ComboRateModel['components'] = []
  const foodComponent = components.find(({ type }) => type === 'FOOD_RATE')
  const treatmentComponent = components.find(
    ({ type }) => type === 'TREATMENT_RATE'
  )
  const placeComponent = components.find(({ type }) => type === 'PLACE_RATE')
  if (foodComponent) res.push(foodComponent)
  if (treatmentComponent) res.push(treatmentComponent)
  if (placeComponent) res.push(placeComponent)
  return res
}

export const comboRateService = createApi({
  reducerPath: 'comboRateService',
  baseQuery,
  tagTypes: ['ComboRate'],
  endpoints: (builder) => ({
    getAllComboRate: builder.query<ComboRateModel[], null>({
      query: () => `rate/combo/all`,
      transformResponse(response: ComboRateModel[]) {
        return response.map((combo) => ({
          ...combo,
          components: sortComponents(combo.components),
        }))
      },
      providesTags: ['ComboRate'],
    }),
    createComboRate: builder.mutation<null, ComboRateModel>({
      query: (comboRate) => ({
        url: `rate/combo/create/${comboRate.components
          .map((component) => JSON.parse(String(component)))
          .map(({ id }) => id)
          .join('/')}`,
        method: 'post',
        body: {
          ...comboRate,
          components: comboRate.components.map((component) =>
            JSON.parse(String(component))
          ),
        },
      }),
      invalidatesTags: ['ComboRate'],
    }),
    removeComboRate: builder.mutation<
      null,
      Partial<ComboRateModel> & Pick<ComboRateModel, 'id'>
    >({
      query: (comboRate) => ({
        url: `rate/combo/delete/${comboRate.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['ComboRate'],
    }),
    updateComboRate: builder.mutation<null, ComboRateModel>({
      query: (comboRate) => {
        console.log(comboRate)
        return {
          url: `rate/combo/update/${comboRate.id}/${comboRate.components
            .map((component) =>
              typeof component === 'object'
                ? component
                : JSON.parse(String(component))
            )
            .map(({ id }) => id)
            .join('/')}`,
          method: 'put',
          body: {
            ...comboRate,
            components: comboRate.components.map((component) =>
              typeof component === 'object'
                ? component
                : JSON.parse(String(component))
            ),
          },
        }
      },
      invalidatesTags: ['ComboRate'],
    }),
  }),
})

export const {
  useGetAllComboRateQuery,
  useCreateComboRateMutation,
  useRemoveComboRateMutation,
  useUpdateComboRateMutation,
} = comboRateService
