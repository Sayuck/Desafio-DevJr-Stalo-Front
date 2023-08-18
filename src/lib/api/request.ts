import type { RawAxiosRequestConfig } from "axios";

import { api } from "./api";

/**
 * Type-safe wrapper for axios requests.
 *
 * @example
 *   const response = await request({
 *     method: "GET",
 *     url: "/users",
 *   });
 *
 * @template Data - Response data type
 * @param {RawAxiosRequestConfig} requestConfig - Axios request config
 * @returns {Promise<Result<Data>>} {@link Result} object with the response data
 *   or the error
 */

export const request = async <Data>(
  requestConfig: RawAxiosRequestConfig
): Promise<Result<Data>> => {
  try {
    const response = await api.request<Data>(requestConfig);

    return { type: "success", value: response.data };
  } catch (error) {
    return { type: "error", error: error as Error };
  }
};
