import axios from "axios";
import { API } from "../../environment";
import type { User } from "../types";

export async function requestLogin(username: string, password: string) {
  try {
    const response = await axios.post(`${API}login`, {
      username,
      password,
    });
    console.log("response", response);
    console.log("response.data", response.data);
    return response.data as User;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return null;
  }
}
