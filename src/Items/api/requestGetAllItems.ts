import { API } from "../../environment";
import type { Item } from "../types";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestGetAllItems(
  currentSpace: string | undefined,
  token?: string | undefined
) {
  const response = await executeRequest(Method.GET, `${API}item/all?space=${currentSpace}`, token);

  if (response) {
    return response.data as Item[];
  }
}
