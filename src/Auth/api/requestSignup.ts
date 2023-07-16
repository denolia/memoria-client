import { API } from "../../environment";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestSignup(username: string, password: string, promo: string) {
  const response = await executeRequest(Method.POST, `${API}user/signup`, undefined, {
    username,
    password,
    promo,
  });
  return response?.status;
}
