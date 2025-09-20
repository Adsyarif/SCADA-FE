export interface ICurrentUserProps {
  name: string;
  role: string;
}

export interface IUser {
  token: string | null;
  currentUser: ICurrentUserProps | null;
}
