export interface ICurrentUserProps {
  name: string;
  role: string;
  token: string;
}

export interface IUser {
  currentUser: ICurrentUserProps | null;
}
