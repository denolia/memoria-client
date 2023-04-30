import axios from "axios";
import { API } from "../../environment";
import type { Item } from "../types";

export async function requestUpdateItem(item: Item, token: string | undefined) {
  let res = null;
  try {
    res = await axios.post(`${API}item`, item, {
      headers: { Authentication: `Bearer ${token}` },
    });
  } catch (e) {
    console.error(e);
  }
  return res;
}
