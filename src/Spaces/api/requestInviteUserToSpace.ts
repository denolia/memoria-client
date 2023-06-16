import axios from "axios";
import { API } from "../../environment";

export async function requestInviteUserToSpace(
  spaceId: string,
  userId: string,
  token: string | undefined
) {
  let res = null;
  try {
    res = await axios.post(
      `${API}space/invite?spaceId=${spaceId}&inviteeId=${userId}`,
      {},
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
