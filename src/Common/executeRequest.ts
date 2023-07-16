import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
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
    res = await axios[method](url, {
      ...config,
      headers: { ...config?.headers, ...(token ? { Authentication: `Bearer ${token}` } : {}) },
    });
  } catch (e) {
    console.error(e);
    enqueueSnackbar((e as Error)?.message ?? `${e}`, {
      variant: "error",
    });
  }
  return res;
}
