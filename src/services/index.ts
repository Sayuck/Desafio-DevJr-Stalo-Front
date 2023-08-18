import { APISlice } from "@lib/api";

/** Define all microservices. */
export const ServicesURLs = {
  API: {
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
    endpointURL: "/",
  },
} as const;

type ServiceName = keyof typeof ServicesURLs;

const Services = {} as Record<ServiceName, APISlice>;

/**
 * Creates {@link APISlice} instances based on the predefined
 * ServicesURLs.
 *
 * If the .env file is not configured correctly, this will
 * throw an error.
 */
Object.entries(ServicesURLs).forEach(
  ([serviceName, { baseURL, endpointURL }]) => {
    if (!baseURL)
      throw new Error(
        `Failed to load baseURL for ${serviceName} service. Check '.env' files.`,
        {
          cause: new Error(
            `${serviceName} baseURL is '${baseURL}'`
          ),
        }
      );

    Services[serviceName as ServiceName] = new APISlice(
      baseURL,
      endpointURL
    );
  }
);

export { Services };
