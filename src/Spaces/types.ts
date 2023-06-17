import { User } from "../Auth/types";

export interface SpaceDef {
  id: string;
  name: string;
  description: string;
  participants: User[];
  owner: User;
}
