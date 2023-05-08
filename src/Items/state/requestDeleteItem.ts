import axios from "axios";
import { API } from "../../environment";
import type { Item } from "../types";

export async function requestDeleteItem(itemId: Item["id"], token: string | undefined) {
  let res = null;
  try {
    res = await axios.delete(`${API}item/${itemId}`, {
      headers: { Authentication: `Bearer ${token}` },
    });
  } catch (e) {
    console.error(e);
  }
  return res;
}
