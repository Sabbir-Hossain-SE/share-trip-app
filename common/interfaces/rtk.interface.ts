import type { SerializedError } from '@reduxjs/toolkit'

import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import type { ApiErrorResponse } from './api.interface'

export interface DefaultTransformErrorResponse {
  message: string
  validationErrors?: ApiErrorResponse['errors']
  originalErrorResponse: FetchBaseQueryError
}

export type APIBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    object,
    FetchBaseQueryMeta
  >,
  never,
  string
>

export type RTKError =
  | FetchBaseQueryError
  | ApiErrorResponse
  | SerializedError
  | undefined
