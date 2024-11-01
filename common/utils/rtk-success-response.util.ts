/* eslint-disable @typescript-eslint/no-unused-vars */

import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import { ApiSuccessResponse } from '../interfaces/api.interface'

/**
 * @summary Default transform success response
 * @param {FetchBaseQueryError} baseQueryReturnValue
 * @param {FetchBaseQueryMeta | undefined} _meta
 * @param {void} _arg
 * @returns {DefaultTransformErrorResponse} - Default transform success response
 */
const defaultTransformResponse = <T>(
  baseQueryReturnValue: ApiSuccessResponse<T>,
  _meta: FetchBaseQueryMeta | undefined,
  _arg: void
): ApiSuccessResponse<T> => {
  return baseQueryReturnValue
}

export default defaultTransformResponse
