import { API } from "../../environment";
import type { Item } from "../types";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestItemById(itemId: string, token: string | undefined) {
  const response = await executeRequest(Method.GET, `${API}item/${itemId}`, token);

  return response?.data as Item;
}
