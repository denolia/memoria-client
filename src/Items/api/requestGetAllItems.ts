import axios from "axios";
import { API } from "../../environment";
import type { Item } from "../types";

export async function requestGetAllItems(
  currentSpace: string | undefined,
  token?: string | undefined
) {
  const response = await axios.get(`${API}item/all?space=${currentSpace}`, {
    headers: { Authentication: `Bearer ${token}` },
  });
  return response.data as Item[];
}
