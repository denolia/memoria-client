import axios from "axios";
import { API } from "../../environment";

export async function requestSignup(username: string, password: string) {
  try {
    const response = await axios.post(`${API}user/signup`, {
      username,
      password,
    });
    return response.status;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return null;
  }
}
