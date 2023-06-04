import axios from "axios";
import { API } from "../../environment";

export async function requestSignup(username: string, password: string, promo: string) {
  try {
    const response = await axios.post(`${API}user/signup`, {
      username,
      password,
      promo,
    });
    return response.status;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return null;
  }
}
