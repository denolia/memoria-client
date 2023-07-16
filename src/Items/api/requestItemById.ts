import axios from "axios";
import { API } from "../../environment";
import type { Item } from "../types";

export function requestItemById(itemId: string, token: string | undefined) {
  return axios
    .get(`${API}item/${itemId}`, {
      headers: { Authentication: `Bearer ${token}` },
    })
    .then((response) => response.data as Item);
}
