/* eslint-disable @typescript-eslint/no-unused-vars */
import { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import { DefaultTransformErrorResponse } from '../interfaces/rtk.interface'
import { ApiErrorResponse } from '../interfaces/api.interface'
import { DEFAULT_API_ERROR_MESSAGE } from '../constants/rtk.constant'

/**
 * @summary Default transform error response
 * - Handles the default error response from the API
 * - Handles the validation error response from the API
 * @param {FetchBaseQueryError} baseQueryReturnValue
 * @param {FetchBaseQueryMeta | undefined} _meta
 * @param {void} _arg
 * @returns {DefaultTransformErrorResponse} - Default transform error response
 */
const defaultTransformErrorResponse = (
  baseQueryReturnValue: FetchBaseQueryError,
  _meta: FetchBaseQueryMeta | undefined,
  _arg: unknown
): DefaultTransformErrorResponse => {
  const response = baseQueryReturnValue.data as ApiErrorResponse
  const errorResponse: DefaultTransformErrorResponse = {
    originalErrorResponse: baseQueryReturnValue,
    message: response?.message || DEFAULT_API_ERROR_MESSAGE,
    validationErrors: response?.errors,
  }

  return errorResponse
}

export default defaultTransformErrorResponse
