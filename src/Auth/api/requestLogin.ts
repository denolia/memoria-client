import axios from "axios";
import { API } from "../../environment";
import type { LoginResponse } from "../types";

export async function requestLogin(username: string, password: string) {
  try {
    const response = await axios.post(`${API}login`, {
      username,
      password,
    });
    return response.data as LoginResponse;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return null;
  }
}
