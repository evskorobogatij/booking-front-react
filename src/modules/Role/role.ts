import { createApi } from '@reduxjs/toolkit/query/react'
import type { RoleModel } from '../../types'
import baseQuery from '../../utils/baseQuery'

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery,
  tagTypes: ['Role'],
  endpoints: (builder) => ({
    getAllRoles: builder.query<RoleModel[], null>({
      query: () => `roles/all`,
      providesTags: ['Role'],
    }),
    createRole: builder.mutation<null, RoleModel>({
      query: (role) => ({
        url: 'roles/create',
        method: 'post',
        body: role,
      }),
      invalidatesTags: ['Role'],
    }),
    removeRole: builder.mutation<
      null,
      Partial<RoleModel> & Pick<RoleModel, 'id'>
    >({
      query: (role) => ({
        url: `roles/delete/${role.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Role'],
    }),
    updateRole: builder.mutation<
      null,
      Partial<RoleModel> & Pick<RoleModel, 'id'>
    >({
      query: (role) => ({
        url: `roles/update/${role.id}`,
        method: 'put',
        body: role,
      }),
      invalidatesTags: ['Role'],
    }),
  }),
})

export const {
  useGetAllRolesQuery,
  useCreateRoleMutation,
  useRemoveRoleMutation,
  useUpdateRoleMutation,
} = roleApi
