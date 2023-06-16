import axios from "axios";
import type { SpaceShort } from "../../Auth/types";
import { API } from "../../environment";
import type { Item } from "../types";

export async function requestUpdateItem(
  item: Item,
  space: SpaceShort | null,
  token: string | undefined
) {
  let res = null;
  try {
    res = await axios.post(
      `${API}item`,
      { ...item, space },
      {
        headers: { Authentication: `Bearer ${token}` },
      }
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return res;
}
