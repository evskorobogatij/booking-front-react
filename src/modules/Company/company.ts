import { createApi } from '@reduxjs/toolkit/query/react'
import type { ObjectsList, PaginationParams, CompanyModel } from '../../types'
import baseQuery from '../../utils/baseQuery'
import { getURLSearchParams } from '../../utils'

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery,
  tagTypes: ['Company'],
  endpoints: (builder) => ({
    getAllCompanies: builder.query<ObjectsList<CompanyModel>, PaginationParams>(
      {
        query: (params) => `company/get?${getURLSearchParams(params)}`,
        providesTags: ['Company'],
      }
    ),
    createCompany: builder.mutation<null, CompanyModel>({
      query: (company) => ({
        url: 'company/add',
        method: 'post',
        body: company,
      }),
      invalidatesTags: ['Company'],
    }),
    removeCompany: builder.mutation<
      null,
      Partial<CompanyModel> & Pick<CompanyModel, 'id'>
    >({
      query: (company) => ({
        url: `company/delete/${company.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Company'],
    }),
    updateCompany: builder.mutation<null, CompanyModel>({
      query: (company) => ({
        url: `company/update/${company.id}`,
        method: 'put',
        body: company,
      }),
      invalidatesTags: ['Company'],
    }),
  }),
})

export const {
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useRemoveCompanyMutation,
} = companyApi
