import API_ENDPOINTS from '@/common/constants/api-endpoints.constant'
import { API_BASE_URL } from '@/common/constants/app.constant'
import {
  API_SLICES,
  RTK_QUERY_TAG_TYPES,
  RTK_QUERY_TAGS,
} from '@/common/constants/rtk.constant'
import { ApiSuccessResponse, Product } from '@/common/interfaces/api.interface'
import defaultTransformErrorResponse from '@/common/utils/rtk-error-response.util'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appAPISlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: () => ({}),
  reducerPath: API_SLICES.PUBLIC_API,
  tagTypes: RTK_QUERY_TAG_TYPES,
})

type ProductApiResponse = {
  limit: number
  products: Product[]
  skip: number
  total: number
}
type ProductApiRequestQuery = object

export const ProductApiSlice = appAPISlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query<ProductApiResponse, ProductApiRequestQuery>({
      query: () => API_ENDPOINTS.PRODUCT.GET_LIST,
      transformResponse: (response: ApiSuccessResponse<ProductApiResponse>) => {
        return response as unknown as ProductApiResponse // Return only the data from the API response
      },
      providesTags: [RTK_QUERY_TAGS.PRODUCT_LIST],
      transformErrorResponse: defaultTransformErrorResponse,
    }),
  }),
})

// Export the generated hook
export const { useGetProductListQuery } = ProductApiSlice
