import { SortDirection } from './index'

export interface PaginationParams {
  page?: number
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
  text?: string
}
