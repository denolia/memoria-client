import axios from "axios";
import { API } from "../../environment";
import { SpaceDef } from "../types";

export function fetchSpaceById(spaceId: string, token: string | undefined) {
  return axios
    .get(`${API}space/${spaceId}`, {
      headers: { Authentication: `Bearer ${token}` },
    })
    .then((response) => response.data as SpaceDef);
}
