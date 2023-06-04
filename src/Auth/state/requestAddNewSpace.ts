import axios from "axios";
import { API } from "../../environment";

export async function requestAddNewSpace(spaceName: string, token: string | undefined) {
  let res = null;
  try {
    res = await axios.post(
      `${API}space`,
      { name: spaceName },
      {
        headers: { Authentication: `Bearer ${token}` },
      }
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return res;
}
