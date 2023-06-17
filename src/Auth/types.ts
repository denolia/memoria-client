export interface LoginResponse {
  username?: string;
  userspaces?: Space[];
  jwt?: string;
}

export interface Space {
  id: string;
  name: string;
}
