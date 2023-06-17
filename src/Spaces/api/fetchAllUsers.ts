import axios from "axios";
import { API } from "../../environment";
import type { User } from "../types";

export function fetchAllUsers(token: string | undefined) {
  return axios
    .get(`${API}user/all`, {
      headers: { Authentication: `Bearer ${token}` },
    })
    .then((response) => response.data as User[]);
}
