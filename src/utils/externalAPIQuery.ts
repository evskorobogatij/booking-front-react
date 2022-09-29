import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const externalAPIQuery = fetchBaseQuery({
  prepareHeaders: (headers) => {
    headers.set('X-Requested-With', 'XMLHttpRequest')

    return headers
  },
})
