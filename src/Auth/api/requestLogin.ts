import { API } from "../../environment";
import type { LoginResponse } from "../types";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestLogin(username: string, password: string) {
  const response = await executeRequest(Method.POST, `${API}login`, undefined, {
    username,
    password,
  });
  if (response) {
    return response.data as LoginResponse;
  }
  return null;
}
