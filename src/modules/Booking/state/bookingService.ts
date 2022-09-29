import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../../utils/baseQuery'
import { BookingSearchParams } from '../types/BookingSearchParams'
import { ObjectsList } from '../../../types'
import { BookingRecordModel } from '../types'
import { getURLSearchParams } from '../../../utils'

export const bookingService = createApi({
  reducerPath: 'bookingService',
  baseQuery,
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    search: builder.query<ObjectsList<BookingRecordModel>, BookingSearchParams>(
      {
        query: (params) => `/room/search/params?${getURLSearchParams(params)}`,
        providesTags: ['Booking'],
      }
    ),
    getBooking: builder.query({
      query: () => `/booking/${1}`,
      providesTags: ['Booking'],
    }),
    createBooking: builder.mutation<null, any>({
      query: (body) => ({
        url: `/booking/create?${getURLSearchParams({
          placeId: body.placeId,
          userId: body.userId,
          comboRateId: body.comboRateId || null,
          sendById: body.sendById || null,
        })}`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['Booking'],
    }),
    createBookingGroup: builder.mutation<null, any>({
      query: (body) => ({
        url: `/booking/createGroup?${body.placesId
          .map((p: any) => `placesId=${p}`)
          .join('&')}&${getURLSearchParams({
          userId: body.userId,
          comboRateId: body.comboRateId || null,
          sendById: body.sendById || null,
        })}`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['Booking'],
    }),
    updateBooking: builder.mutation<null, any>({
      query: (params) => ({
        url: `/booking/update/${params.id}?${getURLSearchParams({
          placeId: params.placeId,
          userId: params.userId,
          comboRateId: params.comboRateId || null,
          sendById: params.sendById || null,
        })}`,
        method: 'put',
        body: params,
      }),
      invalidatesTags: ['Booking'],
    }),
    removeBooking: builder.mutation<number, unknown>({
      query: (bookingId) => ({
        url: `/booking/delete/${bookingId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Booking'],
    }),
    removeBookingGroup: builder.mutation<number, unknown>({
      query: (bookingGroupId) => ({
        url: `/booking/deleteGroup/${bookingGroupId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
})

export const {
  useSearchQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useCreateBookingGroupMutation,
  useUpdateBookingMutation,
  useRemoveBookingMutation,
  useRemoveBookingGroupMutation,
} = bookingService
