import { API } from "../../environment";
import type { Item } from "../types";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestDeleteItem(itemId: Item["id"], token: string | undefined) {
  return executeRequest(Method.DELETE, `${API}item/${itemId}`, token);
}


