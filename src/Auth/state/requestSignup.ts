import axios from "axios";
import { API } from "../../environment";
import type { User } from "../types";

export async function requestSignup(username: string, password: string) {
  try {
    const response = await axios.post(`${API}register`, {
      username,
      password,
    });
    return response.data as User;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return null;
  }
}
