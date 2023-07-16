import { API } from "../../environment";
import { executeRequest, Method } from "../../Common/executeRequest";

export async function requestInviteUserToSpace(
  spaceId: string,
  userId: string,
  token: string | undefined
) {
  return executeRequest(
    Method.POST,
    `${API}space/invite?spaceId=${spaceId}&inviteeId=${userId}`,
    token,
    {}
  );
}
