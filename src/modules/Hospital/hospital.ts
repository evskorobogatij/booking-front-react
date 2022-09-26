import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/baseQuery'
import type { HospitalModel } from './HospitalModel'

export const hospitalApi = createApi({
  reducerPath: 'hospitalApi',
  baseQuery,
  tagTypes: ['Hospital'],
  endpoints: (builder) => ({
    getAllHospitals: builder.query<HospitalModel[], null>({
      query: () => `hospital/all`,
      providesTags: ['Hospital'],
    }),
    createHospital: builder.mutation<null, HospitalModel>({
      query: (hospital) => ({
        url: 'hospital/add',
        method: 'post',
        body: hospital,
      }),
      invalidatesTags: ['Hospital'],
    }),
    removeHospital: builder.mutation<
      null,
      Partial<HospitalModel> & Pick<HospitalModel, 'id'>
    >({
      query: (hospital) => ({
        url: `hospital/delete/${hospital.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Hospital'],
    }),
    updateHospital: builder.mutation<
      null,
      Partial<HospitalModel> & Pick<HospitalModel, 'id'>
    >({
      query: (hospital) => ({
        url: `hospital/update/${hospital.id}`,
        method: 'put',
        body: hospital,
      }),
      invalidatesTags: ['Hospital'],
    }),
  }),
})

export const {
  useGetAllHospitalsQuery,
  useCreateHospitalMutation,
  useRemoveHospitalMutation,
  useUpdateHospitalMutation,
} = hospitalApi
