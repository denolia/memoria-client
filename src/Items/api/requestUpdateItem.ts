import type { Space } from "../../Auth/types";
import { API } from "../../environment";
import type { Item } from "../types";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestUpdateItem(
  item: Item,
  space: Space | null,
  token: string | undefined
) {
  return executeRequest(Method.POST, `${API}item`, token, { ...item, space });
}
