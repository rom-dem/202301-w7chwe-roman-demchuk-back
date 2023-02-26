export interface UserPublic extends UserCredentials {
  avatar: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export type UsersPublic = UserPublic[];
