import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

export async function executeRequest<T = any, D = any>(
  method: Method,
  url: string,
  token: string | undefined,
  data?: D,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T> | null> {
  let res = null;
  try {
    const methodsWithData = [Method.POST, Method.PUT, Method.PATCH];

    const headers = { ...config?.headers, ...(token ? { Authentication: `Bearer ${token}` } : {}) };
    if (methodsWithData.includes(method)) {
      res = await axios[method](url, data, {
        ...config,
        headers,
      });
    } else {
      res = await axios[method](url, {
        ...config,
        headers,
      });
    }
  } catch (e) {
    console.error(e);
    enqueueSnackbar(
      (e as AxiosError<{ message: string }>).response?.data?.message ??
        (e as Error)?.message ??
        `${e}`,
      {
        variant: "error",
      }
    );
  }
  return res;
}
