export interface User {
  username?: string;
  userspaces?: SpaceShort[];
  jwt?: string;
}

export interface SpaceShort {
  id: string;
  name: string;
}
