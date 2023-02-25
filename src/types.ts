export interface UserPublic {
  username: string;
  avatar: string;
}

export interface UserCredentials extends UserPublic {
  password: string;
}

export type UsersPublic = UserPublic[];
