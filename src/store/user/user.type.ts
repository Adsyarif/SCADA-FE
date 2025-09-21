export interface ICurrentUserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export interface IUser {
  token: string | null;
  currentUser: ICurrentUserProps | null;
}
