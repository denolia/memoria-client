import { API } from "../../environment";
import type { SpaceDef } from "../types";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestSpaceById(spaceId: string, token: string | undefined) {
  const response = await executeRequest(Method.GET, `${API}space/${spaceId}`, token);

  if (response) {
    return response.data as SpaceDef;
  }
}
