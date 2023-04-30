import axios from "axios";
import { API } from "../../environment";
import type { Item } from "../types";

export async function requestGetAllItems(token?: string | undefined) {
  const response = await axios.get(`${API}items/all`, {
    headers: { Authentication: `Bearer ${token}` },
  });
  return response.data as Item[];
}
