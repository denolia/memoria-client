import axios from "axios";
import { API } from "../../environment";
import type { Item } from "../types";

export async function requestDeleteItem(item: Item, token: string | undefined) {
  let res = null;
  try {
    res = await axios.delete(`${API}item/${item.id}`, {
      headers: { Authentication: `Bearer ${token}` },
    });
  } catch (e) {
    console.error(e);
  }
  return res;
}
