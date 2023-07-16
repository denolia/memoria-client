import { API } from "../../environment";
import { executeRequest, Method } from "../../Common/executeRequest";

export function requestAddNewSpace(spaceName: string, token: string | undefined) {
  return executeRequest(Method.POST, `${API}space`, token, { name: spaceName });
}
