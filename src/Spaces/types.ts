export interface SpaceDef {
  id: string;
  name: string;
  description: string;
  participants: User[];
  owner: User;
}

export interface User {
  name: string;
  id: string;
}