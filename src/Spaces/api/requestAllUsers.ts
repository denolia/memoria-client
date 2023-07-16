import { API } from "../../environment";
import type { User } from "../types";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestAllUsers(token: string | undefined) {
  const response = await executeRequest(Method.GET, `${API}user/all`, token);

  if (response) {
    return response.data as User[];
  }
}
