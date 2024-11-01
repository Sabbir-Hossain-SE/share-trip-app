export interface PaginationData {
  page?: number
  perPage?: number
  order?: 'ASC' | 'DESC'
  keyword?: string
}

export interface PaginationApiInterface {
  currentPage: number
  totalPages: number
  totalItems: number
}
