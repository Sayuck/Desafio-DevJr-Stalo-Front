import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const errorResponseHandler = (
  error: AxiosError<ApiResponse<string>>
) => {
  if (error?.response) {
    console.log("AXIOS INTERCEPTED ERROR: ", error.response);

    if (typeof error?.response?.data === "string") {
      return Promise.reject(new Error(error.response.data));
    }

    if (typeof error?.response?.data?.message === "string") {
      const cause = error.response.data?.data;

      return Promise.reject(
        new Error(error.response.data.message, {
          cause: cause ? new Error(cause) : undefined,
        })
      );
    }

    return Promise.reject(
      new Error("Something went wrong", {
        cause: error,
      })
    );
  }

  if (error?.request) {
    console.log("INTERNAL SERVER ERROR: ", error?.toJSON?.());

    toast.error("Internal Server Error", {
      containerId: "fetch-error",
      toastId: "internal-server-error",
    });

    return Promise.reject(new Error("Internal server error"));
  }

  return Promise.reject(error);
};
