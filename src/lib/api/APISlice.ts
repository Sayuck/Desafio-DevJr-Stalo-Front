import { Method, RawAxiosRequestConfig } from "axios";

import { sanitizeURL } from "@utils/sanitizeURL";

import { api } from "./api";

type RequestConfig<Payload, Params> = Omit<
  RawAxiosRequestConfig<Payload>,
  "params" | "method"
> & {
  method?: Method;
  params?: Params;
};

/**
 * Define an "API slice" that lists the server's base URL
 * and the resource's path.
 *
 * @example
 *   // Create a service
 *   const UserServices = new APISlice(
 *     "https://example.com/api/v1",
 *     "/users"
 *   );
 *
 *   // Define expected endpoints
 *   // GET /users
 *   const getUsers = UserServices.createQuery<
 *     void,
 *     { id?: number }
 *   >({
 *     method: "GET",
 *     // params: { id: 1 }, // optional expected params
 *   });
 *
 *   // POST /users
 *   const createUser =
 *     UserServices.createQuery<CreateUserPayload>({
 *       method: "POST",
 *     });
 *
 *   // PUT /users/:id
 *   const updateUser =
 *     UserServices.createQuery<UpdateUserPayload>({
 *       method: "PUT",
 *     })({
 *       url: "/users/" + id,
 *     });
 *
 *   // or with query params
 *   // PUT /users?id=:id
 *   const updateUser = UserServices.createQuery<
 *     UpdateUserPayload,
 *     { id: number }
 *   >({ method: "PUT" });
 *
 *   // Usage example
 *   const response = await axios.request(
 *     // options are RawAxiosRequestConfig object, can be used to add additional config such as params or headers.
 *     getUsers(options)
 *   );
 *
 *   const response = await axios.request(
 *     createUser({
 *       data: payload,
 *     }) // createUser expects a payload of type CreateUserPayload
 *   );
 */

export class APISlice {
  /**
   * The server's base URL
   *
   * @example
   *   "https://example.com/api/v1";
   */
  baseURL: string;

  /**
   * A REST API resource.
   *
   * @example
   *   "/posts";
   */
  endpoint: string;

  constructor(baseURL: string, endpoint?: string) {
    if (!baseURL) throw new Error("baseURL is required");

    const sanitizedEndpointURL = sanitizeURL(endpoint);

    this.baseURL = baseURL;
    this.endpoint = sanitizedEndpointURL;
  }

  /**
   * Generates a {@link RawAxiosRequestConfig} object with
   * the given HTTP method, bound to the service's baseURL
   * and endpoint url.
   *
   * @template Payload - The data type of the request body.
   * @template Params - The data type of the request query
   *   params.
   * @param {RequestConfig} config - Define the HTTP method
   *   and other request options.
   * @returns - {@link RawAxiosRequestConfig} object.
   */
  createQuery =
    <Payload = void, Params = void>(
      config: RequestConfig<Payload, Params>
    ) =>
    /**
     * @param {RequestConfig} requestConfig - Optional
     *   {@link RawAxiosRequestConfig} object. If provided,
     *   it will be merged with the base config of the
     *   service. This allows you to override the base
     *   config of the service, or add additional config on
     *   a per-request basis.
     */
    (
      requestConfig?: RequestConfig<Payload, Params>
    ): RawAxiosRequestConfig => ({
      baseURL: this.baseURL,
      url: this.endpoint,
      ...config,
      ...requestConfig,
    });

  /**
   * Creates a new REST API endpoint bound to this service's
   * base URL.
   *
   * @example
   *   // Create a service
   *   const ExampleService = new APISlice(
   *     "https://example.com/api/v1",
   *     "/exampleResource"
   *   );
   *   ExampleService.baseURL; // "https://example.com/api/v1"
   *   ExampleService.endpoint; // "/exampleResource"
   *
   *   // Create a new endpoint bound to the same ExampleService base URL
   *   const AnotherResourceEndpoint =
   *     ExampleService.createEndpoint(
   *       "/anotherResource"
   *     );
   *   AnotherResourceEndpoint.baseURL; // "https://example.com/api/v1", same as ExampleService;
   *   AnotherResourceEndpoint.endpoint;
   *   ("/anotherResource");
   *
   *   //Create a query for the new endpoint
   *   const getAnotherResource =
   *     AnotherResourceEndpoint.createQuery({
   *       method: "GET",
   *     });
   *
   * @param {string} endpoint - The endpoint's URL
   */
  createEndpoint = (endpoint: string) =>
    new APISlice(this.baseURL, sanitizeURL(endpoint));

  /** Returns the status of the Service */
  status = async () => {
    const response = await api.request(
      this.createQuery({ method: "GET" })()
    );

    return response.status === 200;
  };
}
